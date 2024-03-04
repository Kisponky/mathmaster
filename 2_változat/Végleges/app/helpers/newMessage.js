const axios = require('axios');
require('dotenv').config();

function newMessage(name, email) {
    const emailData = {
        "Messages": [{
            "From": {
                "Email": process.env.SENDER_EMAIL,
                "Name": "MathMaster"
            },
            "To": [{
                "Email": email
            }],
            "TemplateID": 5752010,
            "TemplateLanguage": true,
            "Variables": {
                "name": name
            }
        }]
    };

    axios.post('https://api.mailjet.com/v3.1/send', emailData, {
        auth: {
            username: process.env.API_KEY,
            password: process.env.API_SECRET
        },
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('Email sent successfully:', response.data);
    })
    .catch(error => {
        console.error('Error sending email:', error.response.data);
    });
}

module.exports = newMessage;