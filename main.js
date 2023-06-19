import {Paragraph, Superscript, Subscript, Strikethrough} from './src/index.js'

const editor = new EditorJS({
    /**
     * Id of Element that should contain Editor instance
     */
    holder: 'editor',
    tools: {
        paragraph: {
            class: Paragraph,
            inlineToolbar: true
        },
        superscript: Superscript,
        subscript: Subscript,
        strikethrough: Strikethrough
    },
});

let btn = document.getElementById('btn-save')

if (btn) {
    btn.addEventListener('click', () => {
        editor.save().then((data) => {
            console.log(data)
        }).catch((error) => {
            console.log(error)
        })
    })
}