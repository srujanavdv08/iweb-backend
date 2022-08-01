const mongodb = require("mongodb");
const formatUtil = require("util").format;
const config = require("../constants");
const MongoClient = mongodb.MongoClient;
const dbName = config.MONGO_DB_NAME;
const dbUser = config.MONGO_USER;
const dbPwd = encodeURIComponent(config.MONGO_PWD);
const url = formatUtil(config.MONGO_URL, dbUser, dbPwd);
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var _db;

module.exports = {
  connectToMongo: async function (cb) {
    client.connect(function (err, client) {
      if (err) {
        return cb(err, null);
      }
      _db = client.db(dbName);
      return cb(null, client);
    });
  },

  getDb: function () {
    return _db;
  },
};
