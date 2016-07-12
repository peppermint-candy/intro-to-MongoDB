
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/basic_mongoose')

app.use(bodyParser.urlencoded({ extended: true}));

var path = require('path');

app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// -------------------mongodb stuff goes here ---------------------
var UserSchema = new mongoose.Schema({
	name: String,
	age: Number
})

mongoose.model('User',UserSchema);
var User = mongoose.model('User')

app.get('/', function( req, res) {
	User.find( {}, function (err, users) {
		console.log(users[0].name)
		res.render('index', { user : users[0]} );
	})
})

app.post('/users', function ( req , res) {

	var user = new User({ name : req.body.name , age: req.body.age });
	user.save(function (err) {
		if(err) {
			console.log('something went wrong!');
		}else {
			console.log('successfully added a user!');
			res.redirect('/')
		}
	})
})

app.listen(8000, function() {

	console.log("listening on port 8000");

})

