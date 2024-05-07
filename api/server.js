const express = require('express');
const server = express();

const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');

server.use(express.json());

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res)=>{
    res.send(`<h2>Time to make stuff!</h2>`)
});

server.use('*', (req, res)=>{
    res.send(`<h1>Boom baby!!!</h1>`)
});

server.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({ message: err.message || 'An internal server error occurred.' });
});
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
