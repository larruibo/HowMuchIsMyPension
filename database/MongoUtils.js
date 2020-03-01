const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
function MongoUtils() {
  const mu = {};

  let username = process.env.DB_USERNAME,
    password = process.env.DB_PASSWORD,
    dbName = process.env.DB_NAME,
    url = `mongodb+srv://${username}:${password}@pensiondb-y5joy.mongodb.net/test?retryWrites=true&w=majority`;

  mu.dbName = (name) => arguments.length !== 0 ? ((mu.dbName = name), mu) : dbName;
  mu.port = (port) => arguments.length !== 0 ? ((mu.port = port), mu) : port;
  mu.hostname = (hostname) => arguments.length !== 0 ? ((mu.hostname = hostname), mu) : hostname;
  mu.url = url;
  mu.connect = () => {
    const options = { useUnifiedTopology: true, useNewUrlParser: true };
    url = `mongodb+srv://${username}:${password}@pensiondb-y5joy.mongodb.net/test?retryWrites=true&w=majority`;
    const client = new MongoClient(url, options);
    return client.connect();
  };

  mu.ipcs = {};

  mu.ipcs.find = query => {
    return mu.connect()
      .then((client) => {
        console.log("getting client details");
        const ipcs = client.db(dbName).collection("ipcs");
        console.log("Querrying", query);
        return ipcs.find(query)
          .toArray()
          .finally(() => client.close());
      });
  };
  mu.cotizaciones = {};

  //Get All Cotizaciones 
  mu.cotizaciones.find = query => {
    return mu.connect()
      .then((client) => {
        console.log("getting Cotizaciones");
        const cotizaciones = client.db(dbName).collection("cotizaciones");
        console.log("Querrying", query);
        return cotizaciones.find(query)
          .toArray()
          .finally(() => client.close());
      });
  };

  mu.cotizaciones.insert = (query) => {
    return mu.connect()
      .then(client => {
        const cotizaciones = client.db(dbName).collection("cotizaciones");
        return cotizaciones.insertOne(query)
          .finally(() => client.close());
      });
  };

  mu.cotizaciones.delete = (query) => {
    return mu.connect()
      .then(client => {
        console.log("query-------------delete",query);
        const cotizaciones = client.db(dbName).collection("cotizaciones");
        return cotizaciones.deleteOne(query)
          .finally(() => client.close());
      });
  };

  mu.insert = (client, query) => {
    const cot = client.db(dbName).collection("cotizaciones");
    return cot.insertOne(query).toArray();
  };

  mu.users = {};
  mu.passport = {};

  mu.passport.findOne = (query) => {
    return mu.connect()
      .then(client => {
        const usuarios = client.db(dbName).collection("usuarios");
        return usuarios.findOne(query).finally(() => client.close());
      });
  };

  mu.passport.findById = (query, cb) => {
    mu.connect()
      .then(client => {
        const usuarios = client.db(dbName).collection("usuarios");
        usuarios.findOne({username: query})
          .then( (usuario, err) => {
            cb(err, usuario);
          });
      });
  };

  mu.passport.insert = (query) => {
    return mu.connect()
      .then(client => {
        const usuarios = client.db(dbName).collection("usuarios");
        return usuarios.insertOne(query).finally(() => client.close());
      });
  };

  mu.users.insert = (client, query) => {
    const usuarios = client.db(dbName).collection("usuarios");
    return usuarios.insertOne(query)
      .finally(() => client.close());
  };

  return mu;
}

module.exports = MongoUtils();
