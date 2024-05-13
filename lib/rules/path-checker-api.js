/**
 * @fileoverview Check path 'api'.
 * @author path-checker-api
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
      description: "Check path 'api'.",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      messageId: `In the api module, the import must be relative.`,
    },
  },

  create(context) {
    // variables should be defined here
    const layers = {
      api: 'api',
    }
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
        if (checkRelativePath(fromFileName, importPath, layers))
          context.report({node, messageId: 'messageId'})
      },
    }
  },
};
