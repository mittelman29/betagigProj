var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  //res.render('index', { title: 'Inbox' });
  res.render('index', { title: 'Inbox', logged_in_user: req.app.get('logged_in_user'), users: req.app.get('users'), conversations: req.app.get('inbox').conversations });
});

module.exports = router;
