const APIAI_TOKEN = process.env.APIAI_TOKEN

const request = require('request')
const apiai = require('apiai')
const async = require('async')
const actions = require('./actions')

const apiaiApp = apiai(APIAI_TOKEN)

const processPostback = (event) => {
  let senderId = event.sender.id
  let payload = event.postback.payload

  switch (payload) {
    case 'GET_STARTED_PAYLOAD':
      console.log('@@am in GETSTARTED')
      request({
        url: 'https://graph.facebook.com/v2.6/' + senderId,
        qs: {
          access_token: process.env.PAGE_ACCESS_TOKEN,
          fields: 'first_name'
        },
        method: 'GET'
      }, (err, response, body) => {
        if (err) {
          console.log("Error greeting user's name:" + err)
        } else {
          let bodyObj = JSON.parse(body)
          let name = bodyObj.first_name
          let text1 = `Hi ${name} am LakaCoupon, am a robot 🤖 and am here to notify you on different products from different shops and give you a discount on every product by using coupons.`
          let text2 = `Here is how it works, i will show you different products from different shops then with my coupons go into different shops and use them to get a discount.`
          async.series({
            func1: actions.prepareSendAiMessage.bind(null, senderId, text1),
            func2: actions.prepareSendAiMessage.bind(null,senderId, text2),
            func3: actions.getUserDetails.bind(null, senderId, name)
          }, () => {})
        }
      })
      break

    case '':

      break
    default:
      if (_.isEmpty(payload)) {
        // console.log('The payload is impty cant display anything :(')
      } else {
        // console.log(`Payload: ${payload}`)
        let str = payload.split('#')
        let strPayload = str[0]
    
      }
  }
}
/* GET query from API.ai */
const receivedMessage = (event) => {
  let senderId = event.sender.id
  let text = event.message.text

  let apiai = apiaiApp.textRequest(text, {sessionId: 'LakaCoupon'})

  apiai.on('response', (response) => {
    let aiText = ''
    // const resolvedQuery = response.result.resolvedQuery
    let msgObj = response.result.fulfillment.messages
    msgObj.forEach((obj) => {
      aiText = obj.speech
    })
    const action = response.result.action
    const parameters = response.result.parameters

    // console.log(`RESPONSE is:`, JSON.stringify(response, undefined, 2))
    // console.log(`Action is: ${action}`)
    // console.log(`TEXT is: ${aiText}`)

    switch (action) {
      default:
        //actions.prepareSendAiMessage(senderId, aiText)
    }
  })

  apiai.on('error', (error) => {
    console.error(`Apiai returned an error ${error}`)
  })

  apiai.end()
 }

const processQuickReply = (event) => {
  let message = event.message
  let senderId = event.sender.id
  if (message.quick_reply) {
    let payload = message.quick_reply.payload
    let str = payload.split('#')
    let strPayload = str[0]

    console.log(`Payload: ${strPayload}`)
    
  }
}
module.exports = {
  processPostback,
  receivedMessage,
  processQuickReply
}
