/**
 * @fileoverview Verifying that the module is accessed through a public api
 * @author Dolgov Denis
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/public-api-module"),
    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({parserOptions: {ecmaVersion: 6, sourceType: "module"},});
ruleTester.run("public-api-module", rule, {
    valid: [
        {
            code: "import {ChecksClient} from 'entities/TestCheck/index.ts'",
            errors: [],
            options: [{rootPath: 'src', layers: ['features', 'entities']}]
        },
        {
            code: "import {ChecksClient} from 'redux/TestCheck/index.ts'",
            errors: [],
            options: [{rootPath: 'src', layers: ['features', 'entities']}]
        },
        {
            filename: '\\\\wsl$\\Ubuntu\\home\\plugin\\registry\\src\\features\\file.test.ts',
            code: "import {ChecksClient} from 'features/TestCheck/testing'",
            errors: [],
            options: [{
                rootPath: 'src',
                layers: ['features', 'entities'],
                testFilesPatterns: ['**/*.test.ts', '**/*.test.ts', '**/StoreDecorator.tsx']
            }],
        },
        {
            filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\entities\\file.test.ts',
            code: "import { addCommentFormActions, addCommentFormReducer } from 'entities/Article/testing'",
            errors: [],
            options: [{
                rootPath: 'src',
                layers: ['features', 'entities'],
                testFilesPatterns: ['**/*.test.ts', '**/*.test.ts', '**/StoreDecorator.tsx']
            }],
        },

        // {
        //     filename: '\\\\wsl$\\Ubuntu\\home\\plugin\\registry\\src\\features\\StoreDecorator.tsx',
        //     code: "import {addCommentFormActions} from 'features/TestCheck/testing'",
        //     errors: [],
        //     options: [{
        //         rootPath: 'src',
        //         layers: ['features', 'entities'],
        //         testFilesPatterns: ['**/*.test.ts', '**/*.test.ts', '**/StoreDecorator.tsx']
        //     }],
        // },
        // {
        //     filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\entities\\StoreDecorator.tsx',
        //     code: "import { addCommentFormActions, addCommentFormReducer } from 'entities/Article/testing'",
        //     errors: [],
        //     options: [{
        //         rootPath: 'src',
        //         layers: ['features', 'entities'],
        //         testFilesPatterns: ['**/*.test.ts', '**/*.test.ts', '**/StoreDecorator.tsx']
        //     }],
        // },

    ],

    invalid: [
        {
            code: "import {ChecksClient} from 'features/TestCheck/model/index.ts'",
            errors: [{message: "Direct access to the module elements is prohibited. Absolute import is allowed only from the public api. (index.ts)"}],
            options: [{rootPath: 'src', layers: ['features', 'entities']}]
        },
    ],
});
