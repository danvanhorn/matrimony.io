const Airtable = require('airtable')
const { json, send } = require('micro')
const process = require('process')

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.API_KEY
})

const base = Airtable.base('appDWgGZokOqEJx4q')

module.exports = async (req, res) => {
    const { firstName, lastName, email, plusOne } = await json(req)
    base('rsvp-list').create({ firstName, lastName, email,plusOne }, (err, record) => {
        if (err) { 
            send(res, 500, err)
        } else {
            send(res, 200, record)
        }
    })
}