const { Router } = require('express');
const Aviary = require('../models/Aviary');

const aviaryRouter = Router();

aviaryRouter.get('/aviaries', async (req, res) => {
    try {
        const aviaries = await Aviary.find({ });
        res.json(aviaries);
    } catch (err) {
        res.status(500).json({ message: 'Что-то пошло не так..(' });
    }
});

aviaryRouter.post('/create', async (req, res) => {
    try {
        const { title } = req.body;
        const aviary = new Aviary({ title });

        await aviary.save();
        res.status(201).json({ aviary });
    } catch (err) {
        res.status(500).json({ message: 'Что-то пошло не так..(' });
    }
})

module.exports = aviaryRouter;