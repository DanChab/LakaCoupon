const request = require('request')

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN

request({
    url: 'https://vicoupon-api.herokuapp.com/notification/affiliateWithNotification',
    body: {
        hasNotification: '1'
    },
    method: 'POST',
    json: true
}, (error, response , body) => {
    if (!error && response.statusCode === 200) {
        console.log(`body ${JSON.stringify(body, undefined,2)}`)
    }else {
        console.log('Error: Could not get affiliates with notification')
    }
})

// request({
//     url: 'https://vicoupon-api.herokuapp.com//notification/sendProductDetails',
//     body: {
//         affiliateId: affiliateId
//     },
//     method: 'POST',
//     json: true
// }, (error, response, body) => {
//     if (!error && response.statusCode === 200) {
//         console.log(`body: ${body}`);
        
//     }else {
//         console.error('Could not get product details and userId')
//     }
// })