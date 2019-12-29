exports.name = function(voxaEvent) {
  return voxaEvent.model.name;
};

exports.cardType = voxaEvent => {
  return voxaEvent.rawEvent.queryResult.parameters.cardType;
};
