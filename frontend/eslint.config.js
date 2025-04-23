// eslint.config.js
import eslint from "@eslint/js";
import vuePlugin from "eslint-plugin-vue";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import nuxtPlugin from "eslint-plugin-nuxt";


export default [
    eslint.configs.recommended,
    {
        files: ["**/*.vue"],
        languageOptions: {
            parser: tsParser, // ✅ Correct Vue parser
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                parser: tsParser, // ✅ TS parser for `<script setup>`
            },
        },
        plugins: {
            vue: vuePlugin, // ✅ Ensure this is an object
            "@typescript-eslint": tsPlugin,
            import: importPlugin, // Enable import plugin
            nuxt: nuxtPlugin, // ✅ Added Nuxt plugin
        },
        rules: {
            "vue/singleline-html-element-content-newline": [
                "error",
                {
                    ignoreWhenNoAttributes: true,
                    ignoreWhenEmpty: true,
                },
            ],
            "vue/max-attributes-per-line": [
                "error",
                {
                    "singleline": 1, // Enforces one attribute per line in single-line elements
                    "multiline": {
                        "max": 1, // Enforces one attribute per line for multiline elements
                    },
                },
            ],
            "vue/html-indent": [
                "error",
                2, // Indentation level (2 spaces)
                {
                    "baseIndent": 1, // Base indent level for <template> and <script>
                    "alignAttributesVertically": true, // Align attributes vertically
                },
            ],
            "vue/html-self-closing": [
                "error",
                {
                    html: {
                        void: "always", // ✅ Ensure `<img />`, `<br />`, etc. are self-closing
                        normal: "always", // ✅ Prevent unnecessary self-closing tags
                        component: "always", // ✅ Require self-closing for empty Vue components
                    },
                    svg: "always",
                    math: "always",
                },
            ],
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    'argsIgnorePattern': '^_', // Ignore arguments starting with '_'
                    'varsIgnorePattern': '^_', // Ignore variables starting with '_'
                },
            ],
            'no-unused-vars': 'off', // Turn off the default rule to avoid conflicts

            // Enforce using @ alias and prevent relative imports like ../../
            "import/no-relative-parent-imports": ["error"], // Prevent relative imports like ../../
            "import/no-unresolved": ["error"], // Ensure imports resolve properly
        },
        settings: {
            "import/resolver": {
                alias: {
                    map: [["@", "./"]], // Resolve @ to the root directory
                    extensions: [".ts", ".js", ".jsx", ".json", ".vue"], // Extensions to be considered for resolving
                },
            },
        },
    },
    /*{
      files: ['**!/!*.ts', '**!/!*.tsx', '**!/!*.vue'],
      extends: [
        'plugin:nuxt/recommended', // Use the Nuxt recommended linting rules
      ],
    },*/
];