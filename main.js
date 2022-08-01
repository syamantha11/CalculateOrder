const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const fromRequest = require('./request.js');
const path = require('path');
const deasync = require('deasync');
const cp = require('child_process');
const exec = deasync(cp.exec);
const post = 3000;
app.listen(post, () => console.log('Server is running...'));

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extend:true}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname,'views'));

outs = [];
urls = {
  Borzo: {
      url: "https://robotapitest.wefast.in/api/business/1.1/calculate-order",
      options: {
          headers: {
              'X-DV-Auth-Token':'API KEY'
            },
          method: 'POST'
      }
  },
  Borzoa: {
      url: "https://robotapitest.wefast.in/api/business/1.1/calculate-order",
      options: {
          headers: {
              'X-DV-Auth-Token':'API KEY'
            },
          method: 'POST'
      }
  }
};

app.get('/', (request, response) => {
  
  return response.render('index.html')
});


app.post('/check', (request, response) => {
  // console.log(request.body.src)
  // console.log("size"+Object.keys(urls).length);
  for(var i in urls){
    const json = {
      "matter": "Documents",
      "points": [{"address": request.body.src},{"address": request.body.dest}]
    };
    urls[i].options['json'] = json;
    // console.log(i);
    
    fromRequest.callApi(urls[i], function(resp){
      
      console.log(i);
      console.log("Response "+Object.keys(resp));
      
      outs.push(i);
      outs.push(resp.order.payment_amount);
    });

  }
  while(outs.length != Object.keys(urls).length){
      deasync.runLoopOnce();
  }
  console.log('Out'+outs);
  // response.write(JSON.stringify(outs));
  response.render('output.ejs',{listofouts: outs});
  // response.end();
});

app.get('/order',(req, res) => {
    fromRequest.callApi(function(resp){
      console.log(__dirname+'\\views\\')
      res.write("The amount to be paid is "+JSON.stringify(resp.order.payment_amount));
      //res.render('index.html',{'amt': resp.order.payment_amount});
      res.end();
    });
});
