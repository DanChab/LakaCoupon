const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN

const request = require('request')
const delay = require('delay')
const async = require('async')

const getUserDetails = (senderId, userName) => {
    request({
      url: 'https://lakacoupon.herokuapp.com/usersDetails/getInfo',
      body: {
        userId: senderId,
        userName: userName
      },
      method: 'POST',
      json: true
    }, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        console.log('User details posted to server success!!!')
      } else if (response.body.isUserRegistered === 'yes'){
        console.log('User already in DB')
      }else {
        console.error('Could not post user details to the server!!!')
      }
    })
  }

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
    getUserDetails,
    prepareSendAiMessage
  }