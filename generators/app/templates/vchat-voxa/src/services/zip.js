var zipper = require("zip-local");

zipper.sync
  .zip("./speech-assets/dialogflow/production")
  .compress()
  .save("df-agent.zip");
