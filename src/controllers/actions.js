const am = require("../models/actions");
const pm = require("../models/projects");

module.exports = {
  all: async (req, res, next) => {
    try {
      const actions = await am.get();

      if (actions.length === 0) {
        next({
          status: 404,
          message: `There are no actions.`
        });
      } else {
        res.status(200).json({
          success: true,
          actions
        });
      }
    } catch (err) {
      next({
        status: 500,
        message: `Actions could not be retrieved.`
      });
    }
  },
  one: async (req, res, next) => {
    try {
      const action = await am.get(req.params.id);

      if (!action) {
        next({
          status: 404,
          message: `This action does not exist.`
        });
      } else {
        console.log(action.id);
        res.status(200).json({
          success: true,
          action
        });
      }
    } catch (err) {
      next({
        status: 500,
        message: `Action could not be retrieved.`
      });
    }
  },
  new: async (req, res, next) => {
    const data = req.body;
    const length = Object.keys(data).length;
    const { project_id, description, notes } = data;

    try {
      const project = await pm.get(project_id);
      if (!project) {
        next({
          status: 404,
          message: `This project does not exist.`
        });
      } else {
        if (length === 0) {
          next({
            status: 400,
            message: `Missing action data.`
          });
        }
        if ((length > 0 && !project_id) || !description || !notes) {
          next({
            status: 400,
            message: `Missing required project_id, description, or notes field.`
          });
        }
        const newAction = await am.insert(data);
        if (newAction) {
          res.status(201).json({
            success: true,
            action: newAction
          });
        }
      }
    } catch (err) {
      next({
        status: 500,
        message: `Action could not be saved.`
      });
    }
  },
  rm: async (req, res, next) => {
    const { id } = req.params;

    try {
      const deleted = await am.remove(id);

      if (!deleted) {
        next({
          status: 400,
          message: `This action does not exist.`
        });
      } else {
        res.status(200).json({
          success: true,
          message: `Action ID ${id} deleted.`
        });
      }
    } catch (err) {
      next({
        status: 500,
        message: `Action could not be deleted.`
      });
    }
  },
  update: async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    const length = Object.keys(data).length;

    try {
      if (length === 0) {
        next({
          status: 400,
          message: `Missing action data.`
        });
      }
      const updatedAction = await am.update(id, data);

      if (!updatedAction) {
        next({
          status: 400,
          message: `This action does not exist.`
        });
      } else {
        res.status(200).json({
          success: true,
          updatedAction
        });
      }
    } catch (err) {
      next({
        status: 500,
        message: `Action could not be updated.`
      });
    }
  }
};
