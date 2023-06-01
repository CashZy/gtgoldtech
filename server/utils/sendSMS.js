import { Vonage } from '@vonage/server-sdk'

const vonage = new Vonage({
    apiKey: process.env.nexmoAPIKey,
    apiSecret: process.env.nexmoAPISecret
})

const from = "Delo"
const to = "923113245049"


const sendSMS = async(too, otp) => {
    const text = `Hello! Your OTP code is ${otp}.`
    console.log('to', too)
    console.log('opt', otp)
    //:dev: not sending to original because of developer number
    // await vonage.sms.send({to, from, text})
    //     .then(resp => { console.log('Message sent successfully'); console.log(resp); })
    //     .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
}

export default sendSMS;