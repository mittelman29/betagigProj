var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/messages/:id', function(req, res) {
  res.render('messages', {
    title: 'Messages',
    logged_in_user: req.app.get('logged_in_user'),
    users: req.app.get('users'),
    messages: req.app.get('inbox').conversations[req.params.id].messages,
    recipient: req.app.get('inbox').conversations[req.params.id].recipient,
    convo: req.params.id
  });
});

module.exports = router;
