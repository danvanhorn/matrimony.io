const Airtable = require('airtable')
const { json, send } = require('micro')

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keydk4StN4zQoG4II'
})

const base = Airtable.base('appDWgGZokOqEJx4q')

module.exports = async (req, res) => {
    const { firstName, lastName, plusOne } = await json(req)
    base('rsvp-list').create({ 
        firstName, 
        lastName, 
        plusOne 
    }, (err, record) => {
        if (err) { 
            send(res, 500, err)
        } else {
            send(res, 200, record)
        }
    })
}