<script setup>

</script>

# Paragraph

Basic text tool with alignment (left, center, right, and justify)

## Usage

Add a new Tool to the tools property of the Editor.js initial config.

```js
import { Paragraph } from "@ageesea/text-toolkit"

let editor = EditorJS({
  ...

  tools: {
    ...
    paragraph: {
      class: Paragraph,
      inlineToolbar: true,
    },
  }

  ...
});
```

## Config Params

The Paragraph Tool supports these configuration parameters:

| Field            | Type      | Description        |
|------------------|-----------| ------------------ |
| placeholder      | `string`  | The placeholder. Will be shown only in the first paragraph when the whole editor is empty.  |
| preserveBlank    | `boolean` | (default: `false`) Whether or not to keep blank paragraphs when saving editor data |
| defaultAlignment | `string`  | (default: `false`) Whether or not to keep blank paragraphs when saving editor data |

## Output Data

| Field     | Type     | Description     |
|-----------|----------|-----------------|
| text      | `string` | paragraph's text |
| alignment | `string`  | text alignment (left, center, right, and justify) |

```json
{
  "type" : "paragraph",
  "data" : {
    "text" : "Follow me @anthonygacis",
    "alignment": "center"
  }
}
```