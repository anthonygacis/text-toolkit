
interface BlockConstruct {
    data: Data
    config: Config
    api: Api
    readOnly: boolean
}

type Styles = {
    block: string
    loader: string
    input: string
    settingsButton: string
    settingsButtonActive: string
}

type Api = {
    i18n: any;
    styles: IStyles
}

type Config = {
    placeholder?: string
    preserveBlank?: boolean
}

type Data = {
    text?: string
    alignment?: string
}