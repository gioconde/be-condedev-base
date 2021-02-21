import {MongoClient,Db} from 'mongodb'
class MongoDbSingleton {

    private static instance: Db

    private constructor(){}

    static async getInstance() {
        if(!this.instance){
            const URL = process.env.MONGO_URL
            const dbName = process.env.MONGO_DB    
            const mongoClient = new MongoClient(URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }); 
            await mongoClient.connect()
            const db = mongoClient.db(dbName);
            this.instance = db
            console.log("Gerou conexão MongoDB")
        }
        return this.instance
    }
}

export default MongoDbSingleton