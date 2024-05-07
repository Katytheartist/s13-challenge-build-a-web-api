// Write your "projects" router here!
const express = require('express')
const Project = require('./projects-model')
const {validateProjectId, validateProject} = require('./projects-middleware')
const router = express.Router()


router.get('/', (req, res, next)=>{
    Project.get()
    .then(projects =>{
        res.json(projects)
    })
    .catch(next)
})

router.get('/:id', validateProjectId,  (req, res)=>{
    res.json(req.project)
    // try{
    //     const project = await Project.get(req.params.id)
    //     if(!project){
    //         res.status(404).json({
    //             message: 'problem finding id'
    //         })
    //     } else {
    //         res.json(req.project)
    //     }
    // }
    // catch (err) {
     //   next(err)
    // }
})

router.post('/', validateProject, (req, res, next)=>{
    const newProjectData = {name: req.name, description: req.description, completed: true}
    Project.insert(newProjectData)
    .then(newProject =>{
        //throw new Error('danggit')
        res.status(201).json(newProject)
    })
    .catch(next)
})

router.delete('/:id', validateProjectId, async (req, res, next)=>{
    try{
        await Project.remove(req.params.id);
        res.json(req.project);
    } catch(err){
        next(err)
    }
})

router.put('/:id', validateProjectId, validateProject, (req, res, next)=>{
    const projectInfo = {name: req.name, description: req.description, completed: req.completed}
    Project.update(req.params.id, req.body)
    .then(()=>{
        return Project.get(req.params.id)
    })
    .then(updatedProject=>{
        if(!updatedProject){
            res.status(400).json({
                message: 'update failed because missing name or description or completion status'
            })
        } else {
            res.json(updatedProject)
        }
    })
    .catch(next)
})

// router.get('/:id/actions', validateProjectId, (req, res)=>{

// })


router.use((err, req, res, next)=>{ //eslint-disable-line
    res.status(err.status || 500).json({
        customMessage: 'A tragedy occurred in projects router!', 
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router