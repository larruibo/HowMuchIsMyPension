const MongoClient = require("mongodb").MongoClient;

function MongoUtils() {
  const mu = {};

  let hostname = "hostname",
    port = 27017,
    dbName = "Pension";

  mu.dbName = (name) => arguments.length !== 0 ? ((mu.dbName = name), mu) : dbName;
  mu.port = (port) => arguments.length !== 0 ? ((mu.port = port), mu) : port;
  mu.hostname = (hostname) => arguments.length !== 0 ? ((mu.hostname = hostname), mu) : hostname;

  mu.connect = () => {
    const url = `mongodb://${hostname}:${port}`;
    const client = new MongoClient(url);
    return client.connect();
  };
  return mu;
}

module.exports = MongoUtils;