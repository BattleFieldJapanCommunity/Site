module.exports = {
  plugins: [
    "stylelint-scss",
  ],
  extends: [
    "stylelint-config-recess-order",
    "stylelint-config-prettier",
    "stylelint-config-standard",
    "stylelint-config-recommended-scss",
  ],
  rules: {
    "selector-class-pattern": false,
    "font-family-no-missing-generic-family-keyword": false,
    "no-descending-specificity": false,
    "order/properties-order": false,
    "length-zero-no-unit": false,
    "selector-type-no-unknown": { ignore: ["ui"] },
  },
  ignoreFiles: [
    "**/docs/css/style.min.css",
    "**/node_modules/**",
  ],
};