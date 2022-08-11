module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    quotes: 0,
    "import/extensions": "off",
  },
};
