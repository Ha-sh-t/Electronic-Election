import mongoose from 'mongoose';


//getting url
const url = "mongodb+srv://777harishitkumar:6F2Au9llrteQo4Dm@cluster0.bwecn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
let client;

const connectToMongoose = async () => {
    try {


        await mongoose.connect(url); //return a promise
        console.log("mongodb is connected using mongoose ..")

    } catch (err) {
        console.log(err)
    }
}


export default connectToMongoose;