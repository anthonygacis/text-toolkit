import SuperScriptIcon from './asset/subscript.svg?raw'

export default class Subscript {
    private api: InlineApi;
    private button: HTMLButtonElement | null;
    private _state: boolean;
    private tag: string;

    constructor({api}: InlineConstruct) {
        this.api = api;
        this.button = null;
        this._state = false;

        this.tag = 'SUB';
    }

    static get sanitize() {
        return {
            sub: true
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

        /**
         * If start or end of selection is in the highlighted block
         */
        if (termWrapper) {
            this.unwrap(termWrapper);
        } else {
            this.wrap(range);
        }
    }

    wrap(range: any) {
        const selectedText = range.extractContents();
        const mark = document.createElement(this.tag);
        mark.appendChild(selectedText);
        range.insertNode(mark);
        this.api.selection.expandToTag(mark);
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