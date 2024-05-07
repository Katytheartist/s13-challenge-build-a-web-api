const express = require('express');
const Actions = require('./actions-model');

const { validateActions, validateActionId} = require('./actions-middlware');

const router = express.Router();


router.get('/', (req, res, next)=>{
    Actions.get()
    .then(actions =>{
        res.json(actions)
    })
    .catch(next)
});

router.get('/:id', validateActionId,  (req, res)=>{
    res.json(req.action)
});

router.post('/', validateActions, (req, res, next)=>{
    Actions.insert(req.body)
    .then(newAction =>{
        res.status(201).json(newAction);
    })
    .catch(next);
});

router.delete('/:id', validateActionId, async (req, res, next)=>{
    try{
        await Actions.remove(req.params.id);
        res.json(req.action);
    } catch(err){
        next(err);
    }
});

router.put('/:id', validateActionId, validateActions, (req, res, next)=>{
    Actions.update(req.params.id, req.body)
    .then(()=>{
        return Actions.get(req.params.id);
    })
    .then(updatedAction=>{
        if(!updatedAction){
            res.status(404).json({
                message: 'update failed because missing notes or description or project id from action'
            })
        } else {
            res.json(updatedAction)
        }
    })
    .catch(next);
});


router.use((err, req, res, next)=>{ //eslint-disable-line
    res.status(err.status || 500).json({
        customMessage: 'A tragedy occurred in actions router!', 
        message: err.message,
        stack: err.stack,
    })
});

module.exports = router;