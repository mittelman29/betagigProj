var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var inboxes = require('../data/inboxes.json');
var dateFormat = require('dateformat');
var fs = require('fs');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
//var jsonParser = bodyParser.json();

/* API Routes */

/* GET All Conversation */
router.get('/api', function(req, res) {
    res.json(req.app.get('inbox').conversations);
});

/* GET Conversation By ID */
router.get('/api/:id', function(req, res) {
    res.json(req.app.get('inbox').conversations[req.params.id]);
});

/* POST New Message to Conversation */
router.post('/api/:id', function(req, res) {
    /*
    Arguments:
        user: logged_in_user,
        subject: $('#new_message_subject').val(),
        message: $('#new_message_text').val()
    */
    inboxes.inboxes[req.body.user].conversations[req.params.id].messages.unshift({
        sender: req.body.user,
        subject: req.body.subject,
        date: dateFormat(new Date(), "yyyy-mm-dd HH:MM"),
        message: req.body.message
    });
    fs.writeFile('data/inboxes.json', JSON.stringify(inboxes), 'utf8', function(err){
        console.log(err);
    });
    res.json(inboxes.inboxes[req.body.user].conversations[req.params.id]);
});

/* DELETE message */
router.delete('/api/:id', function(req, res){
    /*
    Arguments:
        user: logged_in_user,
        message: message
    */
    inboxes.inboxes[req.body.user].conversations[req.params.id].messages.splice(req.body.message,1);
    res.json(inboxes.inboxes[req.body.user].conversations[req.params.id]);
});

module.exports = router;
