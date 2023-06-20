import './index.css'
import SuperScriptIcon from './asset/superscript.svg?raw'

interface SuperscriptInlineConstruct extends InlineConstruct {
    config: {
        textClass: string
    }
}

export default class Superscript {
    private api: InlineApi;
    private button: HTMLButtonElement | null;
    private _state: boolean;
    private _css: { textClass: any };
    private tag: string;

    constructor({api, config}: SuperscriptInlineConstruct) {
        this.api = api;
        this.button = null;
        this._state = false;

        this._css = {
            textClass: config.textClass
        }

        this.tag = 'SUP';
    }

    static get sanitize() {
        return {
            sup: true
        };
    }

    static get isInline() {
        return true;
    }

    get state() {
        return this._state;
    }

    set state(state) {
        this._state = state;

        this.button?.classList.toggle(this.api.styles.inlineToolButtonActive, state);
    }

    render() {
        this.button = document.createElement('button');
        this.button.type = 'button';
        this.button.innerHTML = SuperScriptIcon
        this.button.classList.add(this.api.styles.inlineToolButton);

        return this.button;
    }

    surround(range: any) {
        if (!range) {
            return;
        }
        let termWrapper = this.api.selection.findParentTag(this.tag);

        if (termWrapper) {
            this.unwrap(termWrapper);
        } else {
            this.wrap(range);
        }
    }

    wrap(range: any) {
        const selectedText = range.extractContents();
        const tag = document.createElement(this.tag);
        if(this._css.textClass) tag.classList.add(this._css.textClass)
        tag.appendChild(selectedText);
        range.insertNode(tag);
        this.api.selection.expandToTag(tag);
    }

    unwrap(termWrapper: any) {
        this.api.selection.expandToTag(termWrapper);

        let sel = window.getSelection();
        let range = sel?.getRangeAt(0);

        let unwrappedContent = range?.extractContents();

        termWrapper.parentNode.removeChild(termWrapper);

        if (unwrappedContent) range?.insertNode(unwrappedContent);

        sel?.removeAllRanges();
        if(range) sel?.addRange(range)
    }

    checkState() {
        const mark = this.api.selection.findParentTag(this.tag);
        this.state = !!mark;
    }

}