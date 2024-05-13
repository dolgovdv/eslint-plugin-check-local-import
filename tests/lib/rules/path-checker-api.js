/**
 * @fileoverview Check path &#39;api&#39;.
 * @author path-checker-api
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/path-checker-api"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("path-checker-api", rule, {
  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: "In the 'api' catalog, the import must be relative.",
      errors: [{ message: "Fill me in.", type: "Me too" }],
    },
  ],
});
