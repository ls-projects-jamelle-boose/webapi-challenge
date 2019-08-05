const pm = require("../models/projects");

module.exports = {
  all: async (req, res, next) => {
    try {
      const projects = await pm.get();
      if (projects.length === 0) {
        next({
          status: 404,
          message: `There are no projects.`
        });
      } else {
        res.status(200).json({
          success: true,
          projects
        });
      }
    } catch (err) {
      next({
        status: 500,
        message: `Projects could not be retrieved.`
      });
    }
  },
  actions: async (req, res, next) => {
    const { id } = req.params;

    try {
      const project = await pm.get(id);

      if (!project) {
        next({
          status: 404,
          message: `This project does not exist.`
        });
      } else {
        const actions = await pm.getProjectActions(id);

        if (actions.length === 0) {
          next({
            status: 404,
            message: `This project has no actions.`
          });
        } else {
          res.status(200).json({
            success: true,
            actions
          });
        }
      }
    } catch (err) {
      next({
        status: 500,
        message: `This project's actions could not be retrieved.`
      });
    }
  },
  one: async (req, res, next) => {
    try {
      const project = await pm.get(req.params.id);
      if (!project) {
        next({
          status: 404,
          message: `This project does not exist.`
        });
      } else {
        res.status(200).json({
          success: true,
          project
        });
      }
    } catch (err) {
      next({
        status: 500,
        message: `Project could not be retrieved.`
      });
    }
  },
  new: async (req, res, next) => {
    const data = req.body;
    const length = Object.keys(data).length;
    const { name, description } = data;

    try {
      if (length === 0) next({ code: 400, message: "Missing project data." });

      if ((length > 0 && !name) || !description)
        next({
          code: 400,
          message: "Missing required name or description field."
        });

      const newProject = await pm.insert(data);

      if (newProject) res.status(201).json({ newProject, success: true });
    } catch (err) {
      next({ code: 500, message: "Project could not be saved." });
    }
  },
  rm: async (req, res, next) => {
    const { id } = req.params;

    try {
      const deleted = await pm.remove(id);

      if (!deleted) {
        next({
          status: 400,
          message: `This project does not exist.`
        });
      } else {
        res.status(200).json({
          success: true,
          message: `Project ID ${id} deleted.`
        });
      }
    } catch (err) {
      next({
        status: 500,
        message: `Project could not be deleted.`
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
          message: `Missing project data.`
        });
      }
      const updatedProject = await pm.update(id, data);

      if (!updatedProject) {
        next({
          status: 400,
          message: `This project does not exist.`
        });
      } else {
        res.status(200).json({
          success: true,
          updatedProject
        });
      }
    } catch (err) {
      next({
        status: 500,
        message: `Project could not be updated.`
      });
    }
  }
};
