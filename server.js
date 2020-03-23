const express = require('express');
const http = require('http');
const bodyParser = require("body-parser");
const path = require('path');
const morgan = require('morgan');
/* const validator = require("express-validator");
const cookieParser = require('cookie-parser'); */

const app = express();
const twitr = require("./routes/twitr");
const port = '2000';
/* app.use(cookieParser()); */

app.use('/twitr',twitr);
morgan.token('user',function(req,res){
    return 'static file' ;
});

app.use(morgan(':remote-addr :url :method :status :res[content-length] - :response-time ms'));


app.use(express.static(path.join(__dirname, '/public')));
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false
}));



app.get('/', (req, res) => {
    res.redirect('/twitr');
});

http.createServer(app).listen(port, () => {
    console.log(`server listening to ${port}`);
});