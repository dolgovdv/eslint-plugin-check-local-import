/**
 * @fileoverview Check path '...'.
 * @author path-checker-layers
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const {checkRelativePath} = require("../helpers/checkRelativePath");
/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Check path layer.",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: {
      type: "array",
      minItems: 1,
      maxItems: 1,
      items: [
        {
          type: 'object',
          properties: {
            rootPath: {
              type: 'string',
              default: 'src',
              description: 'The root directory'
            },
            layers: {
              type: 'array',
              items: {type: 'string'},
              description: 'A list of layers in a flat architecture.'
            }
          },
          "required": ["layers"]
        },
      ]
    },
    messages: {
      messageId: `In the layer module, the import must be relative.`,
    },
  },

  create(context) {
    const options = context.options[0] || context.options
    const rootPath = options.rootPath || context.options.rootPath;
    const layersArr = options.layers || options.layers;
    const layers = {}
    layersArr.forEach((layer) => {
      layers[layer] = layer
    })
    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      ImportDeclaration(node) {
        const importPath = node.source.value
        const fromFileName = context.filename
        if (checkRelativePath(rootPath, fromFileName, importPath, layers))
          context.report({node, messageId: 'messageId'})
      },
    }
  },
};
