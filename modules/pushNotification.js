const request = require('request')

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN

request({
    url: 'https://vicoupon-api.herokuapp.com/sendProductDetails',
    body: {
        affiliateId: affiliateId
    },
    method: 'POST',
    json: true
}, (error, response, body) => {
    if (!error && response.statusCode === 200) {
        console.log(`body: ${body}`);
        
    }else {
        console.error('Could not get product details and userId')
    }
})