import { MongoClient } from "mongodb";


//getting url
const url = "mongodb+srv://777harshitkumar:38BN4nwzcBGqmJbR@cluster0.bwecn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
let client;

const connectToMongoDB = async ()=> {
                        MongoClient.connect(url) //return a promise
                        .then(clientInstance => {
                            console.log("mongodb is connected ..")
                            client  = clientInstance;
                            const db = client.db("gettingS")
                            const col = db.collection("vote")

                            col.insertOne({"user":"amit" , "vote":1})
                        })
                        .catch(err =>{
                            console.log(err)
                        })
                    }

console.log(connectToMongoDB)
export default connectToMongoDB;