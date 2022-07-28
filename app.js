// jshint esversion:11
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const mailchimp = require('@mailchimp/mailchimp_marketing');
const serverPrefix = process.env.SERVER_PREFIX;
const apiKey = process.env.API_KEY;
const listId = process.env.LIST_ID;


mailchimp.setConfig({
    apiKey: apiKey,
    server: serverPrefix
});

const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res) {
    const subscribingUser = {
        firstName: req.body.fName,
        lastName: req.body.fName,
        email: req.body.email
    };
    async function addSubs() {
        const listId = '00d74b0426';
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: 'subscribed',
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
            }
        });
    
        console.log(
            "Successfully added contact as an audience member. The contact's id is " + response.id
        );
    }
    addSubs().then(
        function () { res.sendFile(__dirname + '/success.html'); },
        function () { res.sendFile(__dirname + '/fail.html');}
    );
});


async function addSubs() {
    const listId = '00d74b0426';
    const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: 'subscribed',
        merge_fields: {
            FNAME: subscribingUser.firstName,
            LNAME: subscribingUser.lastName
        }
    });

    console.log(
        "Successfully added contact as an audience member. The contact's id is " + response.id
    );
}

app.listen(process.env.PORT || 3000, function () {
    console.log('Running');
});