const Actions = require('./actions-model');

async function validateActionId(req, res, next) {
    try {
        const action = await Actions.get(req.params.id)
        if(!action){
            res.status(404).json({
                message: 'no such action known'
            })
        } else {
            req.action = action;
            next()
        }
    }
    catch (err) {
        res.status(500).json({
            customMessage: 'problem finding action with that id',
            message: err.message,
            stack: err.stack,
        })
    }
}

function validateActions(req, res, next) {
    const { notes, description, completed} = req.body;
    if (!notes || !notes.trim() || !description || !description.trim() || typeof completed !== 'boolean') {
        res.status(400).json({ message: 'the request body is missing notes, description or project_id' })
    } else {
        req.notes = notes;
        req.description = description;
        next();
    }
}

module.exports = {
    validateActionId, 
    validateActions}