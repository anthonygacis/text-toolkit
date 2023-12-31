import {Paragraph, Superscript, Subscript, Strikethrough} from './dist/text-toolkit.js'

const editor = new EditorJS({
    holder: 'editor',
    tools: {
        paragraph: {
            class: Paragraph,
            inlineToolbar: true
        },
        superscript: {
            class: Superscript,
            config: {
                textClass: 'custom-superscript'
            }
        },
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