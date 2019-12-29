function register(voxaApp) {
  voxaApp.onIntent("LaunchIntent", voxaEvent => {
    return { text: "Launch.Welcome.text" };
  });

  voxaApp.onIntent("ShowCardIntent", voxaEvent => {
    return { text: "Cardtype.text" };
  });

  voxaApp.onIntent("TypeofCardIntent", voxaEvent => {
    return { text: "ShowCards.text" };
  });

  voxaApp.onIntent("FallbackIntent", voxaEvent => {
    return { text: "FallBack.Misunderstood.text" };
  });

  voxaApp.onIntent("HelpIntent", voxaEvent => {
    return { text: "Help.text" };
  });

  voxaApp.onIntent("JokeIntent", voxaEvent => {
    return { text: "Joke.Response.text" };
  });

  voxaApp.onIntent("CancelIntent", voxaEvent => {
    return { text: "Cancel.text" };
  });

  voxaApp.onIntent("YesIntent", voxaEvent => {
    return { text: "Yes.text" };
  });

  voxaApp.onIntent("NoIntent", voxaEvent => {
    return { text: "No.text" };
  });
}

module.exports = register;
