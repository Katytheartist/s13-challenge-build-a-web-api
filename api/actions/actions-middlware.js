const Actions = require('./actions-model');

async function validateActionId(req, res, next) {
    try {
        const action = await Actions.get(req.params.id)
        if (action) {
            req.action = action
            next()
        } else {
            next({
                status: 404,
                message: "No project found"
            })
        }
    } catch (err) {
        next(err)
    }
}

async function validateActions(req, res, next) {
    try {
        const { project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
        next({ status: 400, 
            message: 'Please provide a project ID, a description and notes' });
    } else {
        req.projectID = project_id;
        req.description = description.trim();
        req.notes = notes.trim();
      next();
    }
} catch(err){
    next(err)
}
  }

module.exports = {
    validateActionId, 
    validateActions}