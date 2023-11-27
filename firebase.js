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

const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = getFirestore(app);

// Reference to the 'contacts' collection in Firestore
const contactsCollection = collection(db, 'contacts');

// Sample data to save
const newData = {
  name: 'John Doe',
  email: 'john@example.com',
  message: 'This is a sample message.',
  phone: '123-456-7890',
};

// Save data to Firestore
addDoc(contactsCollection, newData)
  .then(() => {
    console.log('Data saved successfully!');
  })
  .catch((error) => {
    console.error('Error saving data:', error);
  });
