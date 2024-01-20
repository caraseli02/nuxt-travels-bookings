module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  extends: ["@nuxtjs/eslint-config-typescript", "plugin:prettier/recommended"],
  plugins: [],
  rules: {
    "prettier/prettier": "error",
    "vue/attribute-hyphenation": "off",
    "vue/v-on-event-hyphenation": "off",
    // We use Nuxt auto import components which include directory names
    "vue/multi-word-component-names": "off",
  },
};
