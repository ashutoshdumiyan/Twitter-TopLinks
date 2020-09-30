const twitter = {
  consumerkey: "NAAAQhxhhEwHc3Er10dzrovJk",
  consumersecret: "qSEs1DHnFV3xb4nF0HqA5h5pQo9KknaKnIjQr9OqQRqS5m2T89",
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
