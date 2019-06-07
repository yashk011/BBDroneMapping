const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const publicPath = path.join(__dirname , '../public');

app.use(express.static(publicPath));
app.use('/', router);


router.get('/',function(req,res){
  res.sendFile('/index2.html');
  //__dirname : It will resolve to your project folder.
});


app.listen(process.env.port || 3000);

console.log('Running at Port 3000');
