
type BlockConstruct = {
    data: IData
    config: IConfig
    api: IApi
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
    placeholder: string
    preserveBlank: boolean
    defaultAlignment: string
}

type Data = {
    text?: string
    alignment?: string
}