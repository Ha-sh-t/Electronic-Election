import express from 'express';
import VotesController from './votes.controller.js';
const votesRouter = express.Router()

const votesController =  new VotesController();
votesRouter.post('/cast' , (req , res)=>{
    votesController.cast(req,res)
});
votesRouter.get('/tally' ,(req , res)=>{
    votesController.tally(req,res)
})
export default votesRouter;