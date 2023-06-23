interface InlineConstruct<T = {}> {
    api: InlineApi
    config: T
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