const mongoose = require('mongoose');
const config = require('config');
const debug = require('debug');

// setting debugger for mongoose
const dbgr = debug("development:mongoose");

mongoose
.connect(`${config.get("MONGODB_URI")}/shopx`)
.then(() => {
    dbgr("MongoDB connected successfully");
}
).catch((err) => {
    dbgr("MongoDB connection error:", err);
});

module.exports = mongoose.connection;