/**
 * @fileoverview Check path
 * @author Dolgov Denis
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/path-checker-layers"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {ecmaVersion: 6, sourceType: "module"},
});
ruleTester.run("path-checker-layers", rule, {
  valid: [
    {
      filename: '\\\\wsl$\\Ubuntu\\home\\plugin\\registry\\assets\\api\\Entity\\TestCheck.ts',
      code: "import {InternalChecksClient} from '../Client'",
      errors: [],
      options: [{rootPath: 'assets', layers: ['api', 'widget']}]
    },
    {
      filename: '\\\\wsl$\\Ubuntu\\home\\plugin\\registry\\assets\\widget\\Button\\Edit.tsx',
      code: "import {Delete} from './Delete'",
      errors: [],
      options: [{rootPath: 'assets', layers: ['api', 'widget']}]
    },
    {
      filename: '\\\\wsl$\\Ubuntu\\home\\plugin\\registry\\src\\widget\\Button\\Edit.tsx',
      code: "import {Delete} from './Delete'",
      errors: [],
      options: [{layers: ['api', 'widget']}]
    },
    {
      filename: '\\\\wsl$\\Ubuntu\\home\\plugin\\registry\\src\\widget\\Button\\Edit.tsx',
      code: "import {Delete} from './Delete'",
      errors: [],
      options: [{layers: ['src']}]
    },
    {
      filename: '\\\\wsl$\\Ubuntu\\home\\plugin\\registry\\src\\widget\\Button\\Edit.tsx',
      code: "import {Delete} from 'Delete'",
      errors: [],
      options: [{layers: ['src']}]
    },
  ],

  invalid: [
    {
      filename: '\\\\wsl$\\Ubuntu\\home\\plugin\\registry\\assets\\api\\Entity\\TestCheck.ts',
      code: "import {InternalChecksClient} from 'api'",
      errors: [{message: "In the layer module, the import must be relative."}],
      options: [{rootPath: 'assets', layers: ['api', 'widget']}]
    },
    {
      filename: '\\\\wsl$\\Ubuntu\\home\\plugin\\registry\\assets\\widget\\Button\\Edit.tsx',
      code: "import {Delete} from 'widget'",
      errors: [{message: "In the layer module, the import must be relative."}],
      options: [{rootPath: 'assets', layers: ['api', 'widget']}]
    },
  ],
});
