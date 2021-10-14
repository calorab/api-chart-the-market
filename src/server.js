const app = require('./app');
const {PORT, DB_URL} = require('./config');
const mongoose = require('mongoose');

mongoose.connect(DB_URL, err => {
    if (err) {
        console.log('LOG: ', err);
        errorHandler(err);
    }
})

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`)
});