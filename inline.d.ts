type InlineConstruct = {
    api: InlineApi
    config: Object
}

type InlineApi = {
    styles: {
        inlineToolButtonActive: string
        inlineToolButton: string
    }
    selection: {
        findParentTag: Function
        expandToTag: Function
    }
}