const express = require('express')
const app = express()
const port = 3000

const {initializeApp , cert} = require('firebase-admin/app');
const {getFirestore} = require('firebase-admin/firestore');

var serviceAccount = require("./key.json");   
const { name } = require('ejs');
                   

initializeApp({
    credential: cert(serviceAccount)
})
const db = getFirestore(); 



app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send("Hello World!")
})

app.get('/signin', (req, res) => {
    res.render("signin")
  })

  



  app.get("/signupsubmit", (req, res) => {
    const name = req.query.name;
    const email = req.query.email;
    const password = req.query.pwd;
  
    db.collection('users').add({
      name: name,
      email: email,
      password: password
    })
    .then(() => {
      res.send("signup successful");
    })
    .catch(error => {
      console.error("Error adding document: ", error);
      res.send("An error occurred during signup.");
    });
  })



 
    

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})