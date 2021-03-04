const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.[tj]s"],
  addons: ["@storybook/preset-create-react-app", "@storybook/addon-contexts/register"],
};
