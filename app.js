var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var route = require('./routes/book');
var PageNotFound = require('./routes/get404');
var app = express();

app.set('view engine','ejs');
app.set('views','views');
app.use(bodyParser.urlencoded({extended: false}));
app.use(route);
app.use(PageNotFound.get404);
app.listen(3000, process.env.IP, function () {
    console.log("Local server started");
});
module.exports = app;