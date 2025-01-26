

import mongoose from "mongoose";

// Define the schema for votes
const voteSchema = new mongoose.Schema({
    c1: { type: Number, required: true }, // Encrypted c1 part
    c2: { type: Number, required: true }, // Encrypted c2 part
    userId: { type: String, required: true, unique: true }, // Unique user ID ensures one vote per user
});

// Create a Mongoose model
const VoteModel = mongoose.model("Vote", voteSchema);

export default class VotesRepository {
    async add(encryptedVote, userId) {
        const { c1, c2 } = encryptedVote;
        const vote = new VoteModel({ c1, c2, userId });
        await vote.save();
    }

    async get() {
        return await VoteModel.find({});
    }
}
