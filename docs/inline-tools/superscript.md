# Superscript

A very small characters just above the line of text.

## Usage

Add a new Tool to the tools property of the Editor.js initial config.

```js
import { Superscript } from "@ageesea/text-toolkit"

let editor = EditorJS({
  ...

  tools: {
    ...
    superscript: Superscript,
  }

  ...
});
```

## Config Params

The Superscript Tool supports these configuration parameters:

| Field            | Type      | Description                                                                                                |
|------------------|-----------|------------------------------------------------------------------------------------------------------------|
| textClass      | `string`  | The custom class for superscript. |

## Output Data

Superscript text will be wrapped with a `sup` tag with a text class if provided in config.

| Field     | Type     | Description     |
|-----------|----------|-----------------|
| text      | `string` | paragraph's text |

```json
{
  "type" : "paragraph",
  "data" : {
    "text" : "x<sup>2</sup>",
  }
}
```