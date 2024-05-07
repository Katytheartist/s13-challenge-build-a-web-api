// Write your "projects" router here!
const express = require('express')
const Project = require('./projects-model')
const router = express.Router()

router.get('/', (req, res, next)=>{
    Project.get()
    .then(projects =>{
        res.json(projects)
    })
    .catch(next)
})

// router.get('/:id', (req, res)=>{

// })

// router.post('/', (req, res)=>{

// })

// router.delete('/:id', (req, res)=>{

// })

// router.put('/:id', (req, res)=>{

// })

// router.get('/:id/actions', (req, res)=>{

// })


router.use((err, req, res, next)=>{
    res.statur(err.status || 500).json({
        customMessage: 'A tragedy occurred in projects router!', 
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router