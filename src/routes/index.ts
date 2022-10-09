import express from 'express';
const Router = express.Router();

Router.get('/hello', (request, response) => {
  console.log('hello world');
  response.json({message: "Hiiii"})
});

export default Router;
