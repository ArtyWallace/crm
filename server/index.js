const express = require('express');
const app = express();

const path = require('path');
const mongoose = require('mongoose');
const config = require('config');

const PORT = config.get('port') || 5000;

app.use(express.json({ extended: true }));
app.use('/api/aviaries', require('./routes/aviary.routes'));
app.use('/api/giraffes', require('./routes/giraffes.routes'));
app.use('/api/updates', require('./routes/update.routes'));
app.use('/api/uploads', require('./routes/image.routes'));
// app.use('/uploads', express.static(path.join(__dirname, './uploads')));

async function start() {
    try {
        await mongoose.connect(config.get("mongoUri"), { useNewUrlParser: true, useUnifiedTopology: true });
        app.listen(PORT, () => console.log(`Server has been started on ${PORT} port..`));
    } catch (err) {
        console.log('Error', err.message);
        process.exit(1);
    }
}

start();