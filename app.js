const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

mongoose.connect('mongodb://127.0.0.1:27017/myblog');

const UsersSchema = mongoose.Schema({

	'username': String,
	'email': String, 
	'password': String
})

const PostSchema = mongoose.Schema({

	'title': String,
	'contant': String,
	'author': String
	
});

const Post = mongoose.model('Post', PostSchema);

const User = mongoose.model('User', UsersSchema);





app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {

   let posts = Post.find();

   console.log(posts);
  
   res.render('home');

});

app.get('/about', (req, res) => {

	res.render('about');
});

app.get('/contact', (req, res) => {

	res.render('contact');
});


app.get('/register', (req, res) => {

	res.render('register');
});


app.post('/register', (req, res) => {

	let username = req.body.username;
	let email = req.body.email;
	let password = req.body.password;
	let confirm_password = req.body.confirm_password;

	if(password == confirm_password){

		let user = new User({username: username, email: email, password: password});
		user.save();

		res.redirect('/')
	}
});


app.get('/login', (req, res) => {

    res.render('login');
});

app.post('/login', (req, res) => {

    let username = req.body.username;
    let password = req.body.password;

    console.log(username);
    console.log(password);    

    res.redirect('/')
});


app.get('/addpost', (req, res) => {

	res.render('addpost');
});

app.post('/addpost', (req, res) => {

	let title = req.body.title;
	let content = req.body.content;
	let author = req.body.author;

	let post = new Post({title: title, content: content, author: author});

	post.save();

	res.redirect('/');
})





app.listen(3000, () => {

	console.log('Server is running on port 3000');
});