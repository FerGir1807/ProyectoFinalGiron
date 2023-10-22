import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter } from 'react-router-dom'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7yyZkFmd9eIfUBrOf_TQg1u5lZBIkfpQ",
  authDomain: "coderhouseecommerce-c935c.firebaseapp.com",
  projectId: "coderhouseecommerce-c935c",
  storageBucket: "coderhouseecommerce-c935c.appspot.com",
  messagingSenderId: "550937431678",
  appId: "1:550937431678:web:3a4ca937765e7f4dfb122f"
};

// Initialize Firebase
initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
