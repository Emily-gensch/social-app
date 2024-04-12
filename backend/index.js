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
  console.log("eventid from backend:", eventId);
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
  }) */


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

app.get("/users/:userid", (req, res) => {
  const id = req.params.userid;
  const q = "SELECT * FROM mydb.users WHERE userid = ?";
  mydb.query(q, id, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

// sets a user as an administrator role
app.put("/users/:userid", (req, res) => {
  const userId = req.params.userid;
  console.log("put id: ", userId)
  const q = "UPDATE users SET admin = 1 WHERE userid = ?";
  // const q = "UPDATE users SET 'username' = ?, 'university' = ?, 'email' = ?, 'password' = ?, admin = ? WHERE userid = ?";
  /*
  mydb.query(q, [req.body.username, req.body.university, req.body.email, req.body.password, req.body.admin, userId], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
  */
  mydb.query(q, userId, (err, data) => {
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

app.post("/users/:userid", (req, res) => {
  console.log(req.body);
  const q = "SELECT * FROM users WHERE userid = ?";

  const values = [
    req.body.userid,
  ];

  mydb.query(q, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    } else {
      if (data.length > 0) {
        const user = data[0];
        res.json({ user }); // send the first user matching the credentials
      } else {
        res.send({ message: "Incorrect email/password."});
      }
    }
  });
});

app.get("/rsomembers", (req, res) => {
  const q = "SELECT * from userRso";
  mydb.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

// fetch all the rso events associated with a user's id
app.get("/yourrsoevents/:userId", (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT e.* FROM events e JOIN rsos r ON e.rso = r.rso_name JOIN userrso ru ON r.rsoid = ru.rsoid WHERE ru.userid = ?";
  mydb.query(q, userId, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

// fetch true(1)/false(0) value for whether the user is part of an rso
// params: userid, rso_name
app.get("/isinrso/:userId/:rso_name", (req, res) => {
  const userId = req.params.userId;
  const rso_name = req.params.rso_name;
  const q = "SELECT EXISTS (SELECT 1 FROM userrso u JOIN rsos r ON u.rsoid = r.rsoid WHERE u.userid = ? AND r.rso_name = ?) AS is_member;";
  mydb.query(q, [userId, rso_name], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
})

// when a user joins rso, insert their id and the rso id into userrso joint table
// TODO: THIS QUERY DOESN'T WORK, FIXME
app.post("/userrso/:userId/:rso_name", (req, res) => {
  const userId = req.params.userId;
  const rso_name = req.params.rso_name;
  const q = "INSERT INTO userrso (userid, rsoid) SELECT ?, rsos.rsoid FROM rsos WHERE rsos.rso_name = ?;";

  mydb.query(q, [userId, rso_name], (err, data) => {
    if (err){
      console.log(err);
      return res.send(err);
    }
    return res.json(data);
  });
});

// allow user to leave rso by deleting their id and rsoid form the userrso table
app.delete("/userrso/:userId/:rso_name", (req, res) => {
  const userId = req.params.userId;
  const rso_name = req.params.rso_name;
  const q = "DELETE FROM userrso WHERE userid = ? AND rsoid = (SELECT rsoid FROM rsos WHERE rso_name = ?);";

  mydb.query(q, [userId, rso_name], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// fetch all the rsos a user is an admin of
app.get("/yourrsos/:userId", (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM rsos WHERE owner = ?";
  mydb.query(q, userId, (err, data) => {
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
      const rsoid = data.insertId;
      return res.json({rsoid});
    }
  });
});

app.post("/rsomembers", (req, res) => {
  console.log(req.body);
  const q = "INSERT INTO userRso (userid, rsoid) VALUES (?)";

  const values = [
    req.body.userid,
    req.body.rsoid,
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
        const user = data[0];
        res.json({ user }); // send the first user matching the credentials
      } else {
        res.send({ message: "Incorrect email/password."});
      }
    }
  });
});

app.post("/useremail", (req, res) => {
  console.log(req.body);
  const q = "SELECT * FROM users WHERE email = ?";

  const values = [
    req.body.email,
  ];

  mydb.query(q, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    } else {
      if (data.length > 0) {
        const user = data[0];
        res.json({ user }); // send the first user matching the credentials
      } else {
        res.send({ message: "Unregistered user."});
      }
    }
  });
});

app.post("/userid", (req, res) => {
  console.log(req.body);
  const q = "SELECT * FROM users WHERE userid = ?";

  const values = [
    req.body.userid,
  ];

  mydb.query(q, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    } else {
      if (data.length > 0) {
        res.json(data); // send the first user matching the credentials
      } else {
        res.send({ message: "Unregistered user."});
      }
    }
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
