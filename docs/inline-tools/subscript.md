# Subscript

A very small characters just below the line of text.

## Usage

Add a new Tool to the tools property of the Editor.js initial config.

```js
import { Subscript } from "@ageesea/text-toolkit"

let editor = EditorJS({
  ...

  tools: {
    ...
    subscript: Subscript,
  }

  ...
});
```

## Config Params

This Tool has no config params

## Output Data

Subscript text will be wrapped with a `sub` tag.

| Field     | Type     | Description     |
|-----------|----------|-----------------|
| text      | `string` | paragraph's text |

```json
{
  "type" : "paragraph",
  "data" : {
    "text" : "x<sub>2</sub>",
  }
}
```