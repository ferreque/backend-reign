const request = require("request");
const MongoClient = require("mongodb").MongoClient;
const URL = "https://hn.algolia.com/api/v1/search_by_date?query=nodejs";
const httpReq = async () => {
  await request(URL, { json: true }, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    MongoClient.connect(process.env.MONGODB_CNN, function (err, db) {
      if (err) throw err;
      var dbo = db.db("reignDB");
      dbo.dropCollection("hits", function (err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
        db.close();
      });
    });
    const client = new MongoClient(process.env.MONGODB_CNN);
    async function run() {
      try {
        await client.connect();
        const database = client.db("reignDB");
        const hits = database.collection("hits");
        const docs = body.hits;
        const options = { ordered: true };
        const result = await hits.insertMany(docs, options);
        console.log(`${result.insertedCount} documents were inserted`);
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  });
};

module.exports = httpReq;
