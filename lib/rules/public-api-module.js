/**
 * @fileoverview Verifying that the module is accessed through a public api
 * @author Dolgov Denis
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const micromatch = require("micromatch");
const {isRelativePath} = require("../helpers/checkRelativePath");
const path = require('path')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        type: `problem`, // `problem`, `suggestion`, or `layout`
        docs: {
            description: "Verifying that the module is accessed through a public api",
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
                        // rootPath: {
                        //     type: 'string',
                        //     default: 'src',
                        //     description: 'The root directory'
                        // },
                        layers: {
                            type: 'array',
                            items: {type: 'string'},
                            description: 'List of layers according to the FSD methodology.'
                        },
                        testFilesPatterns: {
                            type: 'array',
                            items: {type: 'string'},
                            description: 'A list of templates for defining text files.',
                            default: []
                        }
                    },
                    "required": ["layers"]
                },
            ]
        }, // Add a schema if the rule has options
        messages: {
            messageId: `Direct access to the module elements is prohibited. Absolute import is allowed only from the public api. (index.ts)`,
            testingMessage: 'The test data must be imported from publicApi/testing.ts'
        },
    },

    create(context) {
        // variables should be defined here
        const options = context.options[0] || context.options
        const layersArr = options.layers || options.layers;
        const layers = {}
        layersArr.forEach((layer) => {
            layers[layer] = layer
        })
        const testFilesPatterns = options.testFilesPatterns || options.testFilesPatterns;
        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            ImportDeclaration(node) {
                // const fromFileName = context.filename
                const importPath = node.source.value
                if (isRelativePath(importPath)) {
                    return
                }

                // [layers, slice, segments, ...]
                const segments = importPath.split('/').filter(item => item !=='index.ts')

                const layer = segments[0]

                if (!layers[layer]) {
                    return
                }

                const isSegmentsImportCount = segments.length > 2
                const isTestingPublicApi = segments[2] === 'testing' && segments.length < 4

                if (isSegmentsImportCount && !isTestingPublicApi) {
                    context.report({node, messageId: 'messageId'})
                }

                if (isTestingPublicApi) {
                    const currentFilePath = context.filename
                    const normalizedPath = path.toNamespacedPath(currentFilePath);
                    const isCurrentFileTesting = testFilesPatterns.some(pattern => {
                        console.log(normalizedPath, pattern, micromatch.isMatch(normalizedPath, pattern))
                            return micromatch.isMatch(normalizedPath, pattern)
                        }
                    )

                    if (!isCurrentFileTesting) {
                        context.report({node, messageId: 'testingMessage'})
                    }
                }

            },
        }
    },
};
