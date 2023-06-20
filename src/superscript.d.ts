import './index.css';
interface SuperscriptInlineConstruct extends InlineConstruct {
    config: {
        textClass: string;
    };
}
export default class Superscript {
    private api;
    private button;
    private _state;
    private _css;
    private tag;
    constructor({ api, config }: SuperscriptInlineConstruct);
    static get sanitize(): {
        sup: boolean;
    };
    static get isInline(): boolean;
    get state(): boolean;
    set state(state: boolean);
    render(): HTMLButtonElement;
    surround(range: any): void;
    wrap(range: any): void;
    unwrap(termWrapper: any): void;
    checkState(): void;
}
export {};
