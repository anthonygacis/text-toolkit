import './index.css';
export default class Paragraph {
    private config;
    private readOnly;
    private _CSS;
    private api;
    private _placeholder;
    private _data;
    private _element;
    private _preserveBlank;
    private settings;
    private CSS;
    constructor({ data, config, api, readOnly }: BlockConstruct);
    static get DEFAULT_PLACEHOLDER(): string;
    static get DEFAULT_ALIGNMENT(): string;
    static get ALIGNMENTS(): {
        left: string;
        center: string;
        right: string;
        justify: string;
    };
    static get conversionConfig(): {
        export: string;
        import: string;
    };
    static get sanitize(): {
        text: {
            br: boolean;
        };
    };
    static get isReadOnlySupported(): boolean;
    static get pasteConfig(): {
        tags: string[];
    };
    static get toolbox(): {
        icon: string;
        title: string;
    };
    get data(): Data;
    set data(data: Data);
    onKeyUp(e: KeyboardEvent): void;
    drawView(): HTMLElement;
    render(): HTMLElement;
    renderSettings(): HTMLDivElement;
    _rerenderSettings(elements: HTMLDivElement[]): void;
    _toggleTune(tune: any): void;
    merge(data: Data): void;
    validate(savedData: any): boolean;
    save(toolsContent: any): {
        text: any;
        alignment: string | undefined;
    };
    onPaste(event: any): void;
}
