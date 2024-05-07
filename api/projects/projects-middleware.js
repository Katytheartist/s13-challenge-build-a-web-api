// add middlewares here related to projects
const Projects = require('./projects-model');

async function validateProjectId(req, res, next) {
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

function validateProject(req, res, next){
    const {name, description, completed} = req.body;
    if(!name || !name.trim() || !description || !description.trim() || typeof completed !== 'boolean'){
        res.status(400).json({
            message: 'missing required name or description'
        })
    } else {
        req.name = name;
        req.description = description;
        next();
    }
}

module.exports = {
    validateProjectId,
    validateProject
}