# Check path &#39;layers&#39;. (`path-checker-layers`)

Please describe the origin of the rule here.Checks whether the imported data inside the layer is relative.

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js
// src/widget/Dialog/Dialog.tsx
import {DialogButton} from "widget"

```

Examples of **correct** code for this rule:

```js

// src/widget/Dialog/Dialog.tsx
import {DialogButton} from "./DialogButton";

```

### Options

{
rootPath: project path,
layers: ['array', 'of', 'monitored', 'layers']
}

## When Not To Use It

It should be used in the absence of architecture.It should be used in the absence of architecture. When the directories
are in the root of the project.

```
src/
├── actions/
├── api/
├── components/
├── helpers/
├── pages/
├── routes/
app.js
package.json
```
