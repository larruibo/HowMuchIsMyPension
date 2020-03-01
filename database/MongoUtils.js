const MongoClient = require("mongodb").MongoClient;

// Modulo utilizado para la base de datos
function MongoUtils() {
  const mu = {};
  let DB_USERNAME = process.env.DB_USERNAME,
    DB_PASSWORD = process.env.DB_PASSWORD,
    DB_NAME = process.env.DB_NAME;

  console.log(DB_USERNAME);
  console.log(DB_PASSWORD);
  console.log(DB_NAME);
  console.log("PUERTOO"+process.env.PORT);
  // Variables
  let username = DB_USERNAME,
    password = DB_PASSWORD,
    dbName = DB_NAME,
    url = `mongodb+srv://${username}:${password}@pensiondb-y5joy.mongodb.net/test?retryWrites=true&w=majority`;
  // Getters
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

  //Da cotizaciones de un usuario 
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

  // inserta cotizaciones de un usuario
  mu.cotizaciones.insert = (query) => {
    return mu.connect()
      .then(client => {
        const cotizaciones = client.db(dbName).collection("cotizaciones");
        return cotizaciones.insertOne(query)
          .finally(() => client.close());
      });
  };

  // Elimina cotizaciones de un usuario
  mu.cotizaciones.delete = (query) => {
    return mu.connect()
      .then(client => {
        console.log("query-------------delete", query);
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

  // Encuentra un usuario para la sesion
  mu.passport.findOne = (query) => {
    return mu.connect()
      .then(client => {
        const usuarios = client.db(dbName).collection("usuarios");
        return usuarios.findOne(query).finally(() => client.close());
      });
  };

  // Encuentra un usuario para la sesion
  mu.passport.findById = (query, cb) => {
    mu.connect()
      .then(client => {
        const usuarios = client.db(dbName).collection("usuarios");
        usuarios.findOne({ username: query })
          .then((usuario, err) => {
            cb(err, usuario);
          });
      });
  };

  // Inserta un nuevo usuario que se registro
  mu.passport.insert = (query) => {
    return mu.connect()
      .then(client => {
        const usuarios = client.db(dbName).collection("usuarios");
        return usuarios.insertOne(query).finally(() => client.close());
      });
  };

  // Inserta un nuevo usuario a la base de datos
  mu.users.insert = (client, query) => {
    const usuarios = client.db(dbName).collection("usuarios");
    return usuarios.insertOne(query)
      .finally(() => client.close());
  };

  return mu;
}

module.exports = MongoUtils();
