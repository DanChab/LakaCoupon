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
        if ( body === null) {
            console.log('Not affialiate wiht notification')
        }else {
            body.forEach((element) => {
                let affiliateId = element._id

    request({
        url: 'https://vicoupon-api.herokuapp.com/notification/sendProductDetails',
        body: {
            affiliateId: affiliateId
        },
        method: 'POST',
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            console.log(`body: ${JSON.stringify(body, undefined, 2)}`);
            createMgTemplate(body)
        }else {
            console.error('Could not get product details and userId')
        }
    })
})
        }
    }else {
        console.log('Error: Could not get affiliates with notification')
    }

    const createMgTemplate = (body) => {
        let productArray = body.products
        console.log(`productArray: ${productArray}`)
    }
})
