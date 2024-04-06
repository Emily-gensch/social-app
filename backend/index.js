import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const mydb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Zerotwo11!",
  database: "mydb",
});

// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Zerotwo11!';.

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/events", (req, res) => {
  const q = "SELECT * FROM events";
  mydb.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/unapprovedevents", (req, res) => {
  const q = "SELECT * FROM events WHERE approved = 0";
  mydb.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/publicevents", (req, res) => {
  const q = "SELECT * FROM events WHERE cat = 'Public' AND approved = 1";
  mydb.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/privateevents", (req, res) => {
  const q = "SELECT * FROM events WHERE cat = 'Private'";
  mydb.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/events", (req, res) => {
  console.log(req.body);
  const q = "INSERT INTO events (name, cat, description, datetime, loc, rso_phone, rso_email, rso, approved, cover) VALUES (?)";

  const values = [
    req.body.name,
    req.body.cat,
    req.body.description,
    req.body.datetime,
    req.body.loc,
    req.body.rso_phone,
    req.body.rso_email,
    req.body.rso,
    req.body.approved,
    req.body.cover,
  ];

  mydb.query(q, [values], (err, data) => {
    if (err){
      console.log(err);
      return res.send(err);
    }
    return res.json(data);
  });
});

app.delete("/events/:id", (req, res) => {
  const eventId = req.params.id;
  const q = " DELETE FROM events WHERE id = ? ";

  mydb.query(q, [eventId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/events/:id", (req, res) => {
  const eventId = req.params.id;
  const q = "UPDATE events SET approved = 1 WHERE id = ?";

  // TO DO: Make it so we can update all the variables in an event
  //const q = "UPDATE events SET name = ?, cat = ?, description = ?, datetime = ?, loc = ?, rso_phone = ?, rso_email = ?, rso = ?, approved = ?, cover = ? WHERE id = ?";

  const values = [
    req.body.name,
    req.body.cat,
    req.body.description,
    req.body.datetime,
    req.body.loc,
    req.body.rso_phone,
    req.body.rso_email,
    req.body.rso,
    req.body.approved,
    req.body.cover,
  ];

  // mydb.query(q, [...values, eventId], (err, data)

  mydb.query(q, [...eventId], (err, data) => {
    if (err){
      console.log(err);
      return res.send(err);
    }
    else{
      console.log("no error");
    }
    return res.json(data);
  });
});

// create all tables
/*
// users table
var user_sql = "CREATE TABLE users (userid INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), university VARCHAR(255), email VARCHAR(255), password VARCHAR(255), admin BOOLEAN)";
mydb.query(user_sql, function (err, result) {
  if (err) throw err;
  console.log("Users table created!");
  })

// events table
var events_sql = "CREATE TABLE events (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), cat VARCHAR(255), description VARCHAR(255), datetime DATETIME, loc VARCHAR(255), rso_phone VARCHAR(255), rso_email VARCHAR(255), rso VARCHAR(255), approved BOOLEAN, cover VARCHAR(255))";
mydb.query(events_sql, function (err, result) {
  if (err) throw err;
  console.log("Events table created!");
  })

// rsos table
var rso_sql = "CREATE TABLE rsos (rsoid INT AUTO_INCREMENT PRIMARY KEY, rso_name VARCHAR(255), owner INT)";
mydb.query(rso_sql, function (err, result) {
  if (err) throw err;
  console.log("RSO table created!");
  })

var junction_sql = "CREATE TABLE userRso (userid INT, rsoid INT, FOREIGN KEY (userid) REFERENCES users(userid), FOREIGN KEY (rsoid) REFERENCES rsos(rsoid))";
mydb.query(junction_sql, function (err, result) {
  if (err) throw err;
  console.log("Junction table created!");
  })
*/

app.get("/users", (req, res) => {
  const q = "SELECT * FROM users";
  mydb.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/login", (req, res) => {
  const q = "SELECT * FROM users";
  mydb.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/rsos", (req, res) => {
  const q = "SELECT * FROM rsos";
  mydb.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/users", (req, res) => {
  console.log(req.body);
  const q = "INSERT INTO users (username, university, email, password, admin) VALUES (?)";

  const values = [
    req.body.username,
    req.body.university,
    req.body.email,
    req.body.password,
    req.body.admin,
  ];

  mydb.query(q, [values], (err, data) => {
    if (err){
      console.log(err);
      return res.send(err);
    }
    return res.json(data);
  });
});

app.post("/rsos", (req, res) => {
  console.log(req.body);
  const q = "INSERT INTO rsos (rso_name, owner) VALUES (?)";

  const values = [
    req.body.rso_name,
    req.body.owner,
  ];

  mydb.query(q, [values], (err, data) => {
    if (err){
      console.log(err);
      return res.send(err);
    } else {
      return res.json(data);
    }
  });
});

app.post("/login", (req, res) => {
  console.log(req.body);
  const q = "SELECT * FROM users WHERE email = ? AND password = ?";

  const values = [
    req.body.email,
    req.body.password,
  ];

  mydb.query(q, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    } else {
      if (data.length > 0) {
        res.json(data); // send the first user matching the credentials
      } else {
        res.send({ message: "Incorrect email/password."});
      }
    }
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
