const request = require('request');
url = "https://robotapitest.wefast.in/api/business/1.1/calculate-order";



// const options = {
//     headers: {
//         'X-DV-Auth-Token':'API KEY'
//       },
//     method: 'POST',
//     json: {
//         "matter":"Documents",
//         "points": [{"address":"Saket, New Delhi, Delhi"},{"address":"Janakpuri, New Delhi, Delhi"}]
//     }
// };
outputs = {};
const usingRequest = (req, callback) => {
    
    
    // console.log('In request '+JSON.stringify(urls[val].options));
    // const options = {
    //     headers: {
    //         'X-DV-Auth-Token':'API KEY'
    //       },
    //     method: 'POST',
    //     json: json
    // };
        
        request(req.url,req.options,(err, res, body) => {
            if(err) return callback(err);
            return callback(body);
        });
    
    

}

module.exports.callApi = usingRequest;