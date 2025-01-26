import express from 'express';
import VotesController from './votes.controller.js';
const votesRouter = express.Router()

const votesController =  new VotesController();
votesRouter.post('/cast' , votesController.cast);