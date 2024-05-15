/**
 * @fileoverview Check import into slices
 * @author Dolgov Denis
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/path-checker-slices"),
    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({parserOptions: {ecmaVersion: 6, sourceType: "module"},});
ruleTester.run("Check local import into slices", rule, {
    valid: [
      {
        filename: '\\\\wsl$\\Ubuntu\\home\\plugin\\registry\\src\\features\\TestCheck\\TestCheck.ts',
        code: "import {InternalChecksClient} from '../TestCheck/ExportSegment'",
        errors: [],
        options: [{rootPath: 'src', layers: ['features', 'entities']}]
      },
    ],

    invalid: [
        {
            filename: '\\\\wsl$\\Ubuntu\\home\\plugin\\registry\\src\\features\\TestCheck\\TestCheck.ts',
            code: "import {InternalChecksClient} from 'features/TestCheck/ExportSegment'",
            errors: [{message: "Inside the slices module, the import must be relative."}],
            options: [{rootPath: 'src', layers: ['features', 'entities']}]
        },
      {
        filename: '\\\\wsl$\\Ubuntu\\home\\plugin\\registry\\src\\features\\TestCheck\\TestCheck.ts',
        code: "import {InternalChecksClient} from 'features/TestCheck'",
        errors: [{message: "Inside the slices module, the import must be relative."}],
        options: [{rootPath: 'src', layers: ['features', 'entities']}]
      },
    ],
});
