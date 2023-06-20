import './index.css';
import SuperScriptIcon from './asset/superscript.svg?raw';
export default class Superscript {
    constructor({ api, config }) {
        Object.defineProperty(this, "api", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "button", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_state", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_css", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tag", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.api = api;
        this.button = null;
        this._state = false;
        this._css = {
            textClass: config.textClass
        };
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
        this.button.innerHTML = SuperScriptIcon;
        this.button.classList.add(this.api.styles.inlineToolButton);
        return this.button;
    }
    surround(range) {
        if (!range) {
            return;
        }
        let termWrapper = this.api.selection.findParentTag(this.tag);
        if (termWrapper) {
            this.unwrap(termWrapper);
        }
        else {
            this.wrap(range);
        }
    }
    wrap(range) {
        const selectedText = range.extractContents();
        const tag = document.createElement(this.tag);
        if (this._css.textClass)
            tag.classList.add(this._css.textClass);
        tag.appendChild(selectedText);
        range.insertNode(tag);
        this.api.selection.expandToTag(tag);
    }
    unwrap(termWrapper) {
        this.api.selection.expandToTag(termWrapper);
        let sel = window.getSelection();
        let range = sel?.getRangeAt(0);
        let unwrappedContent = range?.extractContents();
        termWrapper.parentNode.removeChild(termWrapper);
        if (unwrappedContent)
            range?.insertNode(unwrappedContent);
        sel?.removeAllRanges();
        if (range)
            sel?.addRange(range);
    }
    checkState() {
        const mark = this.api.selection.findParentTag(this.tag);
        this.state = !!mark;
    }
}
