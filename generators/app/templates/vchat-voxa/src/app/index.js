const { GoogleAssistantPlatform, plugins, VoxaApp } = require("voxa");
const voxaGA = require("voxa-ga");
const config = require("../config");
const Model = require("./model");
const states = require("./states");
const variables = require("./variables");
const views = require("./views.json");
const { connectToDb, disconnectFromDb } = require("../services/db/db");
const Card = require("../services/db/models/Card");
const QuickReply = require("../services/db/models/QuickReply");

let environment = process.env.NODE_ENV || "staging";

if (environment === "local") {
  environment = "staging";
}

// const defaultFulfillIntents = require(`../content/${environment}-canfulfill-intents.json`);

const voxaApp = new VoxaApp({ Model, views, variables });
states(voxaApp);

voxaApp.onBeforeReplySent( async (voxaEvent, reply) => {
// get the card type and intent
  const cardType = voxaEvent.rawEvent.queryResult.parameters.cardType;
  const intent = voxaEvent.dialogflow.conv.intent
  
  // find matching cards in DB
  if (cardType !== undefined) {
    await connectToDb();
    const matchingCards = await Card.find({ entity: cardType });
    reply.payload.cards = matchingCards
    disconnectFromDb()
  }

  // find matching quick replies in DB
  switch (intent) {
    case "LaunchIntent":
      await connectToDb();
      const matchingWelcomeQuickReplies = await QuickReply.find({ intent: intent });
      reply.payload.quickReplies = matchingWelcomeQuickReplies
      disconnectFromDb()
      break;
    case "ShowCardIntent":
      await connectToDb();
      const matchingGeneralFoodIntentReplies = await QuickReply.find({ intent: intent });
      reply.payload.quickReplies = matchingGeneralFoodIntentReplies
      disconnectFromDb()
      break;
    default:
      break;
  }
});

exports.assistantAction = new GoogleAssistantPlatform(voxaApp);

plugins.replaceIntent(voxaApp);
voxaGA(voxaApp, config.googleAnalytics);

exports.voxaApp = voxaApp;
