var mysql = require('mysql2');

const config = {
  host: "localhost",
  user: "root",
  password: "Zerotwo11!",
  database: "mydb"
}

var connection = mysql.createConnection(config);

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO events (name, cat, description, datetime, loc, rso_phone, rso_email, rso, approved) VALUES ('Gardening Event', 'Public', 'Plant stuff!', '2023-10-28 19:30:35', 'Orlando, FL', '555-1234', 'me@you.com', 'SWAG', TRUE)";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Row 1 added!");
  });
});

// export the connection
module.exports = connection;
