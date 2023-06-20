import './index.css';
import {IconAlignCenter, IconAlignJustify, IconAlignLeft, IconAlignRight, IconText} from '@codexteam/icons'

type Alignment = {
    left: string
    right: string
    center: string
    justify: string
}

const alignmentStyles: Alignment = {
    left: 'ce-paragraph--left',
    center: 'ce-paragraph--center',
    right: 'ce-paragraph--right',
    justify: 'ce-paragraph--justify',
}

type AlignmentObj = keyof typeof alignmentStyles

export default class Paragraph {
    private config: Config;
    private readOnly: boolean;
    private _CSS: { block: any; wrapper: string; alignment: Alignment };
    private api: Api;
    private _placeholder: any;
    private _data: Data;
    private _element: HTMLElement;
    private _preserveBlank: any;
    private settings: Array<any>;
    private CSS: { input: any; settingsButton: any; settingsButtonActive: any; baseClass: Object; loading: any };

    constructor({ data, config, api, readOnly}: BlockConstruct) {
        this.api = api;
        this.config = config;
        this.readOnly = readOnly;

        this._CSS = {
            block: this.api.styles.block,
            wrapper: 'ce-paragraph',
            alignment: alignmentStyles
        };

        if (!this.readOnly) {
            this.onKeyUp = this.onKeyUp.bind(this);
        }

        this._placeholder = config.placeholder ? config.placeholder : Paragraph.DEFAULT_PLACEHOLDER;
        this._data = {};
        this._element = this.drawView();
        this._preserveBlank = config.preserveBlank !== undefined ? config.preserveBlank : false;

        this.settings = [
            {
                name: 'left',
                icon: IconAlignLeft
            },
            {
                name: 'center',
                icon: IconAlignCenter
            },
            {
                name: 'right',
                icon: IconAlignRight
            },
            {
                name: 'justify',
                icon: IconAlignJustify
            }
        ];

        this.CSS = {
            baseClass: this.api.styles.block,
            loading: this.api.styles.loader,
            input: this.api.styles.input,
            settingsButton: this.api.styles.settingsButton,
            settingsButtonActive: this.api.styles.settingsButtonActive,
        }

        this._data = {
            text: data.text || '',
            alignment: data.alignment || config.defaultAlignment || Paragraph.DEFAULT_ALIGNMENT
        };

        this.data = data;
    }

    static get DEFAULT_PLACEHOLDER() {
        return '';
    }

    static get DEFAULT_ALIGNMENT() {
        return Paragraph.ALIGNMENTS.left;
    }

    static get ALIGNMENTS() {
        return {
            left: 'left',
            center: 'center',
            right: 'right',
            justify: 'justify'
        };
    }

    static get conversionConfig() {
        return {
            export: 'text', // to convert Paragraph to other block, use 'text' property of saved data
            import: 'text' // to covert other block's exported string to Paragraph, fill 'text' property of tool data
        };
    }

    static get sanitize() {
        return {
            text: {
                br: true
            }
        };
    }

    static get isReadOnlySupported() {
        return true;
    }

    static get pasteConfig() {
        return {
            tags: ['P']
        };
    }

    static get toolbox() {
        return {
            icon: IconText,
            title: 'Text 1'
        };
    }

    get data() {
        return this._data;
    }

    set data(data: Data) {
        this._data = {
            text: data.text || '',
            alignment: data.alignment || this.config.defaultAlignment || Paragraph.DEFAULT_ALIGNMENT
        }

        this._element.innerHTML = this._data.text || '';
    }

    onKeyUp(e: KeyboardEvent) {
        if (e.code !== 'Backspace' && e.code !== 'Delete') {
            return;
        }

        const {textContent} = this._element;

        if (textContent === '') {
            this._element.innerHTML = '';
        }
    }

    drawView() {
        let div = document.createElement('DIV');

        div.classList.add(this._CSS.wrapper, this._CSS.block);
        div.contentEditable = String(false);
        div.dataset.placeholder = this.api.i18n.t(this._placeholder);

        if (!this.readOnly) {
            div.contentEditable = String(true);
            div.addEventListener('keyup', this.onKeyUp);
        }

        return div;
    }

    render() {
        return this._element;
    }

    renderSettings() {
        const wrapper = document.createElement('div');

        wrapper.style.display = 'flex'
        wrapper.style.justifyContent = 'center'
        this.settings.map(tune => {
            const button = document.createElement('div');
            button.classList.add('cdx-settings-button');
            button.innerHTML = tune.icon;
            button.classList.toggle(this.CSS.settingsButtonActive, tune.name === this.data.alignment);
            wrapper.appendChild(button);
            return button;
        }).forEach((element, index, elements) => {
            element.addEventListener('click', () => {
                this._toggleTune(this.settings[index].name);
                this._rerenderSettings(elements);
            });
        });

        return wrapper;
    }

    _rerenderSettings(elements: HTMLDivElement[]) {
        elements.forEach((el, i) => {
            const { name } = this.settings[i] as { name: AlignmentObj };
            el.classList.toggle(this.CSS.settingsButtonActive, name === this.data.alignment);
            this._element.classList.toggle(this._CSS.alignment[name], name === this.data.alignment)
        });
    }

    _toggleTune(tune: any) {
        this.data.alignment = tune;
    }

    merge(data: Data) {
        let text: string = ''
        if(this.data.text) {
            text += this.data.text + data.text
        }
        let newData = {
            text: text,
            alignment: this.data.alignment,
        };

        this._element.innerHTML = <string>this.data.text;

        this.data = newData;
    }

    validate(savedData: any) {
        if (savedData.text.trim() === '' && !this._preserveBlank) {
            return false;
        }

        return true;
    }

    save(toolsContent: any) {
        return {
            text: toolsContent.innerHTML,
            alignment: this.data.alignment
        }
    }

    onPaste(event: any) {
        const data = {
            text: event.detail.data.innerHTML,
            alignment: this.config.defaultAlignment || Paragraph.DEFAULT_ALIGNMENT
        };

        this.data = data;
    }
}
