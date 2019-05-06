const Airtable = require('airtable')
const { send } = require('micro')
const process = require('process')

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.API_KEY
})

const base = Airtable.base('appDWgGZokOqEJx4q')

module.exports = function(req, res) {
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
            send(res, 200, guests)
        }
    })
}