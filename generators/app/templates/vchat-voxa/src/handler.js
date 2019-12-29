const {
  assistantAction,
} = require("./app");

exports.assistantHandler = assistantAction.lambdaHTTP();
