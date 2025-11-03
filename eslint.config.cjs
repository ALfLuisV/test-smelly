// Flat ESLint config (CommonJS) — avoids `extends` by including recommended config object
// This file is safe to use in projects with `type: "module"` in package.json
module.exports = [
  // ignore build and deps
  { ignores: ["node_modules/**"] },

  // project-specific overrides and Jest plugin rules
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      // flat config uses `languageOptions.globals` instead of `env`
      globals: {
        // Jest globals
        jest: true,
        // Common Jest test globals
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        // Common Node globals (readonly)
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        module: "readonly",
        exports: "readonly",
        require: "readonly",
      },
    },
    // load jest plugin for flat config
    plugins: {
      jest: require("eslint-plugin-jest"),
    },
    rules: {
      // keep a friendly baseline
      "no-unused-vars": "warn",
      "no-undef": "error",

      // Jest recommended-ish rules (mirrors parts of plugin:jest/recommended)
      "jest/no-disabled-tests": "warn",
      "jest/no-conditional-expect": "error",
      "jest/no-identical-title": "error",
    },
  },
];
