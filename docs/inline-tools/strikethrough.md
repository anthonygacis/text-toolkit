# Strikethrough

Cross something out by drawing a line through it

## Usage

Add a new Tool to the tools property of the Editor.js initial config.

```js
import { Strikethrough } from "@ageesea/text-toolkit"

let editor = EditorJS({
  ...

  tools: {
    ...
    strikethrough: Strikethrough,
  }

  ...
});
```

## Config Params

This Tool has no config params

## Output Data

Strikethrough text will be wrapped with a `s` tag.

| Field     | Type     | Description     |
|-----------|----------|-----------------|
| text      | `string` | paragraph's text |

```json
{
  "type" : "paragraph",
  "data" : {
    "text" : "<s>old price</s>",
  }
}
```