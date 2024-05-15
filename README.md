# eslint-plugin-check-local-import

The Eslint plugin for checking imports inside modules.

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-check-local-import`:

```sh
npm install eslint-plugin-check-local-import --save-dev
```

## Usage

Add `check-local-import` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "check-local-import"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "check-local-import/path-checker-layers": [
      "error",
      {
        "rootPath": "project path",
        "layers": [
          "array",
          "of",
          "monitored",
          "layers"
        ]
      }
    ]
  }
}
```

### Flat configuration
```
import checkLocalImport from 'eslint-plugin-check-local-import'

export default [
    {
        plugins: {
            'check-local-import': checkLocalImport,
        },
        rules: {
            'check-local-import/path-checker-layers': ['error', {rootPath: 'src', layers: ['api', 'components']}],
        },
    },
];
```

## Configurations

<!-- begin auto-generated configs list -->
TODO: Run eslint-doc-generator to generate the configs list (or delete this section if no configs are offered).
<!-- end auto-generated configs list -->



## Rules

<!-- begin auto-generated rules list -->

| Name                                                     | Description              |
| :------------------------------------------------------- | :----------------------- |
| [path-checker-layers](docs/rules/path-checker-layers.md) | Check path layer.        |
| [path-checker-slices](docs/rules/path-checker-slices.md) | Check import into slices |

<!-- end auto-generated rules list -->


