// Write your "projects" router here!
const express = require('express')
const Project = require('./projects-model')
const {validateProjectId} = require('./projects-middleware')
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
    // }
})

// router.post('/', (req, res)=>{

// })

// router.delete('/:id', validateProjectId, (req, res)=>{

// })

// router.put('/:id', validateProjectId, (req, res)=>{

// })

// router.get('/:id/actions', validateProjectId, (req, res)=>{

// })


router.use((err, req, res, next)=>{ 
    res.status(err.status || 500).json({
        customMessage: 'A tragedy occurred in projects router!', 
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router