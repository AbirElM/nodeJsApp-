const express = require('express');
const http = require('http');
const morgan = require('morgan');
const hostname = 'localhost';
const port = 3000;


const bodyParser = require('body-parser');

const dishRouter = require('./routes/dishRouter');

const app = express();

app.use('/dishes',dishRouter);
app.use(morgan('dev'));
app.use(bodyParser.json());





app.get('/dishes/:dishId',(req,res,next)=>{
    res.end('Will send details of the dish with the id ' + req.params.dishId + ' to you !');
});

app.post('/dishes/:dishId',(req,res,next)=>{
    /* Will carry some info in the body */
    res.statusCode = 403; 
    res.end('POST operation not supported on dishes/:dishId' + req.params.dishId);
}); /*  */


app.put('/dishes/:dishId',(req,res,next)=>{
    /* Will carry some info in the body */
    res.write('Updating the dish :' + req.params.dishId);
    res.end('Will update the dish : ' + req.body.name +
    '\n with details ' + req.body.description);
});


app.delete('/dishes/:dishId',(req,res,next)=>{ //! Dangerous op
    res.end('Deleting dish ' + req.params.dishId);
});







app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=> {
    // console.log(req.headers);
    res.statusCode=200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><h1>This is an express server</h1></html>');
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});