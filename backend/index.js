import express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from "multer";
import path from "path";
import { dirname } from 'path';

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/public/uploads')
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({storage: storage})

app.use(cors());
app.use(express.json());
//app.use(multer());

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

// upload event cover images
app.post('/upload', upload.single('image'), (req, res) => {
  const imageUrl = req.file.path; // Path of the uploaded image
  const uploadsIndex = imageUrl.indexOf("\\uploads\\");
  const relativeUrl = imageUrl.substring(uploadsIndex);
  const eventId = req.body.eventid; // Assuming eventId is sent along with the request

  console.log(imageUrl, eventId);

  const query = 'UPDATE events SET cover = ? WHERE id = ?';
  
  mydb.query(query, [relativeUrl, eventId], (err, result) => {
    if (err) {
      console.error('Error updating event cover:', err);
      res.status(500).send('Error uploading image');
    } else {
      console.log('Event cover updated successfully');
      res.status(200).send('Image uploaded successfully');
    }
  });
});

app.get('/event/:eventId/cover', (req, res) => {
  const eventId = req.params.eventId;
  const query = 'SELECT cover FROM events WHERE id = ?';

  mydb.query(query, [eventId], (err, result) => {
    if (err) {
      console.error('Error fetching image URL:', err);
      res.status(500).send('Error fetching image');
    } else {
      if (result.length > 0) {
        const imageUrl = result[0].cover;
        res.json({ cover: imageUrl });
      } else {
        res.status(404).send('Event not found');
      }
    }
  });
});

app.get ('/uploads/')


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

  mydb.query(q, eventId, (err, data) => {
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

// comments table
var rso_sql = "CREATE TABLE comments (commentid INT AUTO_INCREMENT PRIMARY KEY, userid INT, username VARCHAR(255), eventid INT, comment VARCHAR(255), rating INT)";
mydb.query(rso_sql, function (err, result) {
  if (err) throw err;
  console.log("Comments table created!");
  }) 
  
  // university table
var rso_sql = "CREATE TABLE university (name VARCHAR(255) PRIMARY KEY, loc VARCHAR(255), description VARCHAR(255), num_of_students VARCHAR(255), cover VARCHAR(255))";
mydb.query(rso_sql, function (err, result) {
  if (err) throw err;
  console.log("University table created!");
})

// userevents table
var rso_sql = "CREATE TABLE userevents (eventId INT PRIMARY KEY, userId INT)";
mydb.query(rso_sql, function (err, result) {
  if (err) throw err;
  console.log("userevents table created!");
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

// when a user adds event to calendar, store userid and eventid in usersevent table
app.post("/userevents/:eventId/:userId", (req, res) => {
  const eventId = req.params.eventId;
  const userId = req.params.userId;
  const q = "INSERT INTO userevents (`eventId`, `userId`) VALUES (?, ?);";
  mydb.query(q, [eventId, userId], (err, data) => {
    if (err){
      console.log(err);
      return res.send(err);
    }
    return res.json(data);
  });
});

// get the user's upcoming events
app.get("/userevents/:userId", (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT e.* FROM events e JOIN userevents ue ON e.id = ue.eventId WHERE ue.userId = ?;";
  mydb.query(q, [userId], (err, data) => {
    if (err){
      console.log(err);
      return res.send(err);
    }
    return res.json(data);
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
  console.log(req.body.owner);
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

app.get("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  console.log(req.params.userId);
  const q = "SELECT * FROM users WHERE userid = ?";

  mydb.query(q, userId, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    } else {
      return res.json(data);
    }
  });
});

app.get("/rsos/:rsoid", (req, res) => {
  const id = req.params.rsoid;
  const q = "SELECT * FROM mydb.rsos WHERE rsoid = ?";
  mydb.query(q, id, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

// fetch all comments
app.get("/comments", (req, res) => {
  const q = "SELECT * FROM comments";
  mydb.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

// fetch all comments for a given event
app.get("/comments/:eventId", (req, res) => {
  const eventId = req.params.eventId;
  const q = "SELECT * FROM comments WHERE eventid = ?";
  mydb.query(q, eventId, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

// add a comment to the comments table
app.post("/comments", (req, res) => {
  const q = "INSERT INTO comments (userid, username, eventid, comment, rating) VALUES (?)";

  const values = [
    req.body.userid,
    req.body.username,
    req.body.eventid,
    req.body.comment,
    req.body.rating,
  ];

  mydb.query(q, [values], (err, data) => {
    if (err){
      console.log(err);
      return res.send(err);
    }
    return res.json(data);
  });
});

// edit comment
app.put("/comments/:commentid", (req, res) => {
  const commentid = req.params.commentid;
  const com = req.body.comment;
  const q = "UPDATE comments SET comment = ? WHERE commentid = ?";

  mydb.query(q, [com, commentid], (err, data) => {
    if (err){
      console.log(err);
      return res.send(err);
    }
    return res.json(data);
  });

});

// delete comment
app.delete("/comments/:commentid", (req, res) => {
  const commentId = req.params.commentid;
  console.log("commentId", commentId);
  const q = "DELETE FROM comments WHERE commentid = ?";

  mydb.query(q, commentId, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// update university
app.put("/university", (req, res) => {
  const q = "UPDATE university SET name = ?, loc = ?, description = ?, num_of_students = ?, cover = ? WHERE id = ?";

  const values = [
    req.body.name,
    req.body.loc,
    req.body.description,
    req.body.num_of_students,
    req.body.cover,
    req.body.id,
  ];

  mydb.query(q, values, (err, data) => {
    if (err){
      console.log(err);
      return res.send(err);
    }
    return res.json(data);
  });
});

app.get("/university", (req, res) => {
  const q = "SELECT name FROM university WHERE id = 1";
  mydb.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
