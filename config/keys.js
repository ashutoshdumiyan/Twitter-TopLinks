const twitter = {
  consumerkey: "CONSUMER_KEY",
  consumersecret: "CONSUMER_SEXRET_KEY",
};

const mongodb = {
  dbURI:
    "mongodb+srv://dbname:dbpwd@cluster0.fxxjl.mongodb.net/<dbname>?retryWrites=true&w=majority",
};

const session = {
  cookiekey: "twitterappsarefun",
};

const keys = {
  ...twitter,
  ...mongodb,
  ...session,
};

module.exports = keys;
