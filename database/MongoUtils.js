const MongoClient = require("mongodb").MongoClient;

function MongoUtils() {
  const mu = {};

  let hostname = "hostname",
    port = 27017,
    username = "allan9899",
    password = "hola1234",
    dbName = "PensionDB";


  mu.dbName = (name) => arguments.length !== 0 ? ((mu.dbName = name), mu) : dbName;
  mu.port = (port) => arguments.length !== 0 ? ((mu.port = port), mu) : port;
  mu.hostname = (hostname) => arguments.length !== 0 ? ((mu.hostname = hostname), mu) : hostname;

  mu.connect = () => {
    const options = { useUnifiedTopology: true, useNewUrlParser: true };
    const url = `mongodb+srv://${username}:${password}@pensiondb-y5joy.mongodb.net/test?retryWrites=true&w=majority`;
    const client = new MongoClient(url, options);
    return client.connect();
  };
  
  mu.ipcs = {};

  mu.ipcs.find = query => {
    return mu.connect()
      .then((client) => {
        console.log("getting client details");
        const pensiones = client.db(dbName).collection("ipcs");
        console.log("Querrying", query);
        return pensiones.find(query)
          .toArray()
          .finally(() => client.close());
      });
 
  };
  mu.insert = (client, query) => {
    const cot = client.db(dbName).collection("cotizaciones");
    return cot.insertOne(query).toArray(); 
  };

  mu.users= {};
  mu.users.find =(client,query)=>{
    const usuarios= client.db(dbName).collection("usuarios");
    return usuarios.find(query).finally(()=> client.close());
  };

  mu.users.insert =(client,query)=>{
    const usuarios= client.db(dbName).collection("usuarios");
    return usuarios.insertOne(query).finally(()=> client.close());
  };

  return mu;
}
  
module.exports = MongoUtils();
