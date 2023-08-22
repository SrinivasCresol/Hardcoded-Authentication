const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;
const secretKey = "secretkey";

const users = [
  {
    id: 1,
    email: "test@gmail.com",
    password: "123456789",
  },
  {
    id: 2,
    email: "test1@gmail.com",
    password: "1234567890",
  },
];

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find((u) => u.email === email);

    if (user && user.password === password) {
      jwt.sign(
        { email: user.email },
        secretKey,
        { expiresIn: "300s" },
        (err, token) => {
          if (err) {
            res.status(500).json({ message: "Token generation error" });
          } else {
            res.json({ token, message: "Login Successful" });
          }
        }
      );
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
