import './index.css'
import SuperScriptIcon from './asset/superscript.svg?raw'

export default class Superscript {

    constructor({api}) {
        this.api = api;
        this.button = null;
        this._state = false;

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

        this.button.classList.toggle(this.api.styles.inlineToolButtonActive, state);
    }

    render() {
        this.button = document.createElement('button');
        this.button.type = 'button';
        this.button.innerHTML = SuperScriptIcon
        this.button.classList.add(this.api.styles.inlineToolButton);

        return this.button;
    }

    surround(range) {
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

    wrap(range) {
        const selectedText = range.extractContents();
        const mark = document.createElement(this.tag);
        mark.appendChild(selectedText);
        range.insertNode(mark);
        this.api.selection.expandToTag(mark);
    }

    unwrap(termWrapper) {
        /**
         * Expand selection to all term-tag
         */
        this.api.selection.expandToTag(termWrapper);

        let sel = window.getSelection();
        let range = sel.getRangeAt(0);

        let unwrappedContent = range.extractContents();

        /**
         * Remove empty term-tag
         */
        termWrapper.parentNode.removeChild(termWrapper);

        /**
         * Insert extracted content
         */
        range.insertNode(unwrappedContent);

        /**
         * Restore selection
         */
        sel.removeAllRanges();
        sel.addRange(range)
    }

    checkState() {
        const mark = this.api.selection.findParentTag(this.tag);
        this.state = !!mark;
    }

}