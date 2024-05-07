// add middlewares here related to projects
const Projects = require('./projects-model');

async function validateProjectId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id)
        if(!project){
            res.status(404).json({
                message: 'no such ID'
            })
        } else {
            req.project = project
            next()
        }
    }
    catch (err) {
        res.status(500).json({
            customMessage: 'problem finding project with that id',
            message: err.message,
            stack: err.stack,
        })
    }
}

module.exports = {
    validateProjectId
}