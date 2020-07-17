const { Router } = require('express');
const Giraffe = require('../models/Giraffe');

const giraffeRouter = Router();

giraffeRouter.get('/giraffes/:id', async (req, res) => {
    try {
        const giraffes = await Giraffe.find({ aviary: req.params.id });
        res.json(giraffes);
    } catch (err) {
        res.status(500).json({ message: 'Что-то пошло не так..(' });
    }
});

giraffeRouter.post('/create', async (req, res) => {
    try {
        const { id } = req.body;
        const giraffe = new Giraffe({ aviary: id });
        await giraffe.save();
        res.status(201).json({ giraffe });
    } catch (err) {
        res.status(500).json({ message: 'Что-то пошло не так..(' });
    }
});

giraffeRouter.put('/edit', async (req, res) => {
    try {
        const { id, name, gender, weight, height, color, diet, nature, photo } = req.body;
        const giraffe = await Giraffe.findOneAndUpdate({_id: id}, {$set: {
            name, gender, weight, height, color, diet, nature, photo
        }});
        res.status(200).json({ giraffe });
    } catch (err) {
        res.status(500).json({ message: 'Что-то пошло не так..(' });
    }
});

giraffeRouter.delete('/delete', async (req, res) => {
    try {
        const { id } = req.body;
        const giraffe = await Giraffe.findByIdAndDelete(id);
        res.status(200).json({ giraffe });
    } catch (err) {
        res.status(500).json({ message: 'Что-то пошло не так..(' });
    }
});

module.exports = giraffeRouter;