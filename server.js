const express = require('express');
const connectDB = require('./config/db');
const app = express();

// this is good to use for Heroku deployment to get the port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

//part2 added
// initialize middleware
// we used to have to install body-parser, but now it is a built-in middleware 
// function of express! It parses incoming JSON payloads
// For the property extended, we specify false": Note: This actually applies to the sibling middleware express.urlencoded() (which handles HTML form submissions). Setting extended: false tells the parser to use the built-in querystring library to parse URL-encoded data, which limits the data to strings and arrays rather than allowing nested, rich JSON objects
app.use(express.json({ extended: false }));

// just a test route for now
app.get('/', (req, res) => res.send('API running'));

//part2 added
app.use('/api/users', require('./routes/api/users'));
//part4 added
app.use('/api/auth', require('./routes/api/auth'));

//HR employee registration route
app.use('/api/register', require('./routes/api/register'));

//HR employee login route
app.use('/api/login', require('./routes/api/login'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));