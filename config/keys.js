const twitter = {
  consumerkey: "X9Nw89uflL06qC8E7o0HycAJO",
  consumersecret: "A6LRxU01UfPwmTTBne1eN2eenN3HQ338pgx7u2HkjqqFIuiiDD",
};

const mongodb = {
  dbURI:
    "mongodb+srv://ashutosh:twitterapp@cluster0.fxxjl.mongodb.net/<dbname>?retryWrites=true&w=majority",
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
