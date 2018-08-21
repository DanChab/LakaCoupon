const request = require('request')
const cron = require('cron')

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN

    new cron('* * * * *', function() {
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
            let elements = []

            let productArray = body.products
            productArray.forEach((product) => {
                let productPrice = product.productPrice
                let productImage = product.productImage
                let affiliateId = product.affiliateId

                elements.push({
                    "title":`${productPrice}`,
                    "image_url":productImage,
                    "subtitle":`${productPrice}`,
                    "buttons":[
                    {
                        "type": "postback",
                        "title": "🔖 Get Coupon ",
                        "payload": `GET_COUPON#${affiliateId}`
                    }            
                    ]      
                })
            })

            let msgContent = {
            // "message":{
                "attachment":{
                "type":"template",
                "payload":{
                    "template_type":"generic",
                    "sharable": true,
                    elements
                }
                }
            // }
            }

        let usersDetails = body.usersDetails
        usersDetails.forEach((userDetails) => {
            let fbId = userDetails.fbId
            let fbName = userDetails.fbName

            let messageData = {
                recipient: {
                id: fbId
                },
                message: msgContent
            }
            request({
                url: 'https://graph.facebook.com/v2.6/me/messages',
                qs: {access_token: PAGE_ACCESS_TOKEN},
                method: 'POST',
                json: messageData
            
            }, (error, response, body) => {
                console.log(`messeageData: ${JSON.stringify(messageData, undefined, 2)}`)
                if (!error && response.statusCode == 200){
                console(`Notification sent to fbId: ${messageData.recipient.id}`)
                }
                
            })
        })
        }
    })
    } , null, true, 'Africa/Harare')