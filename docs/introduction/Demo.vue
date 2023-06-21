<script setup>
import { onMounted } from "vue"
import EditorJS from "@editorjs/editorjs";
import {Paragraph, Strikethrough, Subscript, Superscript} from "../../src/index.js";
import {ref} from "../.vitepress/cache/deps/vue.js";

const output = ref('')
const editor = ref(null)

function save() {
    if(editor.value) {
        console.log(editor.value)
        editor.value.save().then((data) => {
            output.value = data
        })
    }
}

onMounted(() => {
    editor.value = new EditorJS({
        holder: 'editor',
        minHeight: 30,
        tools: {
            paragraph: {
                class: Paragraph,
                inlineToolbar: true,
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
        placeholder: 'Start typing ...'
    });
})
</script>
<template>
    <div id="editor"></div>
    <button id="btn-save" @click="save">Save</button>
    <p>Output:</p>
    <pre id="output" v-if="output">{{ JSON.stringify(output, null, 2) }}</pre>
</template>

<style scoped>
#btn-save {
    background-color: #1CB6FF;
    border: none;
    color: white;
    padding: 5px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
}

#output {
    background-color: #262335;
    color: #D9D9A7;
    padding: 5px 10px;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
}
</style>