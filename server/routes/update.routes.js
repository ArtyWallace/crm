const { Router } = require("express");
const Update = require("../models/Update");

const updateRouter = Router();

updateRouter.get('/updates/:id', async (req, res) => {
    try {
        const updates = await Update.find({ aviary: req.params.id });
        res.json({ updates });
    } catch (err) {
        res.status(500).json({ message: 'Что-то пошло не так..(' });
    }
});

updateRouter.post('/create', async (req, res) => {
    try {
        const { id, action, giraffe } = req.body;
        const update = await new Update({ action, giraffe, aviary: id });
        await update.save();
        res.status(201).json({ update });
    } catch (err) {
        res.status(500).json({ message: 'Что-то пошло не так..(' });
    }
});

module.exports = updateRouter;