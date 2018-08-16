const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN

const request = require('request')

const prepareSendAiMessage = async (senderId, aiText) => { 
    let messageBubble = {
      recipient: {
        id: senderId
      },
      sender_action:"typing_on"
    }
    sendMessage(messageBubble)
  
    await delay(2000)
    
    let messageData = {
      recipient: {
        id: senderId
      },
      message: {text: aiText}
    }
    console.log(`SenderId in prepareMsg: ${senderId}`)
  
    sendMessage(messageData)
  }
  
  const sendMessage = (messageData) => {
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token: PAGE_ACCESS_TOKEN},
      method: 'POST',
      json: messageData
  
    }, (error, response, body) => {
      if (error) {
        console.error('Error sending message: ', error)
      } else if (response.body.error) {
        console.error('Error: ', response.body.error)
      }
    })
  }

  module.exports = {
    prepareSendAiMessage
  }