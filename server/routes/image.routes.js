const Image = require('../models/Image');

const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { Router } = require('express');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: storage
});

const imageRouter = Router();

imageRouter.post('/uploads', upload.single('image'), async (req, res, next) => {
    try {
        const file = req.file;
        const image = new Image({ fileName: file.filename, filePath: file.path });
        await image.save();
        res.status(201).json({ image });
    } catch (err) {
        res.status(500).json({ message: 'Ошибка при загрузке файла!' });
    }
});

imageRouter.get('/image', )

module.exports = imageRouter;