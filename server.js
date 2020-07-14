// // Required dependencies
// var express = require("express");
// var exphbs = require("express-handlebars");
// var connection = require(connection)



// // Set up MySQL connection.
// var mysql = require("mysql");
// require("dotenv").config();

// var app = express();

// var PORT = process.env.PORT || 8080;


// // Make connection.
// connection.connect(function(err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   console.log("connected as id " + connection.threadId);
// });

// // Export connection for our ORM to use.
// // module.exports = connection;

// // Set the port of our application
// // process.env.PORT lets the port be set by Heroku
// var PORT = process.env.PORT || 8080;


// // Parse application body
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());


// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// // Serve static content for the app from the "public" directory in the application directory.
// // app.use(express.static("public"));




// // Import routes and give the server access to them.
// // Change routes location or just write routes here
// // var routes = require("./controllers/catsController.js");

// // app.use(routes);
// // Use Handlebars to render the main index.html page with the plans in it.
// app.get("/", function (req, res) {
//     connection.query("SELECT * FROM burgers", function (err, burgerData) {
//         if (err)
//             throw err;


//         res.render("index", { burgerKey: burgerData });
//     });
// });


// // Start our server so that it can begin listening to client requests.
// app.listen(PORT, function () {
//     // Log (server-side) when our server has started
//     console.log("Server listening on: http://localhost:" + PORT);
// });


var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "zeroniner09",
  database: "burgers_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// Use Handlebars to render the main index.html page with the plans in it.

// Get burgers from table
app.get("/", function(req, res) {
  connection.query("SELECT * FROM burgers;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.render("index", { burgerKey: data });
  });
});


// Post burgers into table
app.post("/api/burgers", function (req, res) {
    let burgerName = req.body.burger_name;

    connection.query("INSERT INTO burgers (burger_name) VALUES (?)", [burgerName], function (err, data) {
        if (err)
            throw err;
        
        res.status(200).end();
    });
});



// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
  