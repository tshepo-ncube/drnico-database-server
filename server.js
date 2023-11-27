const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyBetfqsQF2KhBL7TklNIk74yxbVYbxwn3A",
    authDomain: "nico-df051.firebaseapp.com",
    projectId: "nico-df051",
    storageBucket: "nico-df051.appspot.com",
    messagingSenderId: "907996978622",
    appId: "1:907996978622:web:996f61e8c3a55bd22e2def",
    measurementId: "G-D5XJPP2MWC"
  };

const FirebaseApp = initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = getFirestore(FirebaseApp);

// Reference to the 'contacts' collection in Firestore
const contactsCollection = collection(db, 'contacts');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS
app.use(bodyParser.json());


const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'color6wrld@gmail.com',
      pass: 'ypyy vrwk xzaz ahsl',
    },
  });




function sendEmail(mailOptions){
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.error(error);
        }
        console.log('Email sent: ' + info.response);
      });
}

function saveDataToDatabase(newData){
    addDoc(contactsCollection, newData)
    .then(() => {
        console.log('Data saved successfully!');
    })
    .catch((error) => {
        console.error('Error saving data:', error);
    });
}
 

// Endpoint to handle POST requests
app.post('/submitForm', (req, res) => {
    // console.log(req)
  const { message, name, subject, email, phoneNumber } = req.body;

  if (!message || !name || !subject || !email || !phoneNumber) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Process the data (you can save it to a database, send an email, etc.)
  // For simplicity, let's just log the data
  console.log('Received form data:', { message, name, subject, email, phoneNumber });

  const data = {
    name: name,
    email:  email,
    message: message,
    phone: phoneNumber,
    subject : subject
  };

  saveDataToDatabase(data);

  const mailOptions = {
    from: 'color6wrld@gmail.com',
    to: 'nico.stanman@gmail.com',
    subject: subject,
    text:  ` Hey Nico, ${name } sent you a message. ${name} says ${message}.  ${name}'s phone numbers are ${phoneNumber} and their email is ${email}`,
  };


  sendEmail(mailOptions);
  res.status(200).json({ success: true, message: 'Form submitted successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});


