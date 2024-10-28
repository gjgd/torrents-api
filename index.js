const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const torrentsController = require('./controllers/torrentController');
const torrentFeed = require('./controllers/torrentFeed');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/api/search', torrentsController);
app.use('/api/feed', torrentFeed);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Server running on port ${PORT}`)
})
