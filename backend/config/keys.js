const twitter = {
  consumerkey: "NAAAQhxhhEwHc3Er10dzrovJk",
  consumersecret: "qSEs1DHnFV3xb4nF0HqA5h5pQo9KknaKnIjQr9OqQRqS5m2T89",
  accesstoken: "980688059720196099-GORwzw7Nfnn2TUiMyyaHZKuwOTDZlwO",
  tokensecret: "pHlPj8IJh2BskWrJh1rUK1OVaZDFcRUBXqroV8S97Fdwk",
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
