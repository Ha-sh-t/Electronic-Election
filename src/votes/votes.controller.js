import { decryptVote, encryptVote, generateKey, PRIME, PRIVATE_KEY, splitSecret } from "../../middlewares/elgamel.encrypt.js";
import VotesRepository from "./votes.repository.js";

export default class VotesController {
    constructor() {
        this.secretKey = PRIVATE_KEY;
        this.prime = PRIME;
        this.votesRepository = new VotesRepository();
    }

    async cast(req, res) {
        try {
            const { vote } = req.body;
            if (vote !== 1 && vote !== -1) {
                return res.status(400).json({ success: false, message: "Invalid vote. Allowed values are 1 or -1." });
            }

            const { userId } = req.cookies; // Ensure user ID is properly fetched
            if (!userId) {
                return res.status(400).json({ success: false, message: "User not authenticated." });
            }

            const { PUBLIC_KEY } = generateKey(); // Generate encryption keys dynamically
            const encryptedVote = encryptVote(vote, PUBLIC_KEY); // Encrypt the vote
            await this.votesRepository.add(encryptedVote, userId); // Save encrypted vote to DB
            res.status(201).send({ success: true, message: "Successfully voted." });
        } catch (err) {
            console.error(err);
            res.status(400).json({ success: false, message: "Unable to cast vote." });
        }
    }

    homomorphicTallying(votes) {
        const aggregated = votes.reduce(
            (acc, { c1, c2 }) => ({
                c1: (acc.c1 * c1) % this.prime,
                c2: (acc.c2 * c2) % this.prime,
            }),
            { c1: 1, c2: 1 }
        );
        return aggregated;
    }

    async tally(req, res) {
        try {
            const votes = await this.votesRepository.get(); // Fetch all votes
            if (!votes.length) {
                return res.status(400).json({ success: false, message: "No votes to tally." });
            }

            const aggregated = this.homomorphicTallying(votes); // Aggregate encrypted votes

            // Example n (participants) and t (threshold) values
            const n = 5; 
            const t = 3; 

            // Split the secret for partial decryption
            const sharedKeys = splitSecret(this.secretKey, n, t, this.prime);

            const partialDecryptions = sharedKeys.slice(0, t).map(share => ({
                share: share,
            }));

            // Decrypt the aggregated result
            const tally = decryptVote(aggregated, partialDecryptions);
            res.json({ success: true, tally }); // Return the tally
        } catch (err) {
            console.error(err);
            res.status(400).json({ success: false, message: "Server internal error." });
        }
    }
}
