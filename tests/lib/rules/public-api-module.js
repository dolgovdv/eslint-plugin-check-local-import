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
    ],

    invalid: [
        {
            code: "import {ChecksClient} from 'features/TestCheck/model/index.ts'",
            errors: [{message: "Direct access to the module elements is prohibited. Absolute import is allowed only from the public api. (index.ts)"}],
            options: [{rootPath: 'src', layers: ['features', 'entities']}]
        },
    ],
});
