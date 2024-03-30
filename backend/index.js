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

// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Zerotwo11!';


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

app.post("/events", (req, res) => {
  const q = "INSERT INTO events (name, cat, description, datetime, loc, rso_phone, rso_email, rso, approved) VALUES (?)";

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
  ];

  mydb.query(q, [values], (err, data) => {
    if (err) return res.send(err);
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
  const q = "UPDATE events SET `name`= ?, `cat`= ?, `description`= ?, `datetime`= ?, `loc`= ?, `rsp_phone`= ?, `rso_email`= ?, `rso`= ?, `approved `= ? WHERE id = ?";

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
  ];

  mydb.query(q, [...values,eventId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
