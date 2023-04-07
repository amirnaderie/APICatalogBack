const config = require('config');
const MongoClient = require('mongodb').MongoClient
// this file is only for MongoClient connection when schema is not exit

class Connection {
    
    static async open() {
        if (this.db) return this.db
        this.db = await MongoClient.connect(this.url, this.options)
        return this.db
    }

}

Connection.db = null
Connection.url = config.get('db');
Connection.options = {
    bufferMaxEntries:   0,
    reconnectTries:     5000,
    useNewUrlParser:    true,
   // useUnifiedTopology: true,
}

module.exports = { Connection }