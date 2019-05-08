const Airtable = require('airtable')
const { json, send } = require('micro')
const process = require('process')

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.API_KEY
})

const base = Airtable.base('appDWgGZokOqEJx4q')

module.exports = async (req, res) => {
    const guest = await json(req)

    let guests = [];

    base('rsvp-list').select({
        view: "Grid view"
    }).eachPage((records, fetchNextPage) => {
        records.forEach((record) => {
            guests.push(record.fields)
        });
        fetchNextPage();
    }, (err) => {
        if (err) { 
            send(res, 500, err)
        } else {
            if(!guests.find(g => g.firstName === guest.firstName && g.lastName === guest.lastName && g.email === guest.email)) {
                base('rsvp-list').create(guest, (err, record) => {
                    if (err) { 
                        send(res, 500, err)
                    } else {
                        send(res, 200, record)
                    }
                })
            } else {
                send(res, 202)
            }
        }
    })
}