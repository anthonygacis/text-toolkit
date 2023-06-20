import './index.css';
export default class Subscript {
    private api;
    private button;
    private _state;
    private tag;
    constructor({ api }: InlineConstruct);
    static get sanitize(): {
        sub: boolean;
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
