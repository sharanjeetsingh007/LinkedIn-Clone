import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Feed from './Feed';
import Login from './Login';
import Widget from './Widget';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from './firebase';
import { login, logout } from './redux/userSlice'
import LinkedinLogin from './LinkedinLogin';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import Home from './Home';





function App() {


  const user = useSelector((state) => state.user.value);
  const [loader, setLoader] = useState(false)

  const dispatch = useDispatch()


  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        // USER ID LOGGED IN

        console.log(userAuth, 'its from app.jsssss')
        dispatch(login(
          {

            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,

            // authProvider: userAuth._delegate.providerData[0].providerId,

          }
        ))
      } else {
        // LOGGED OUT
        dispatch(logout());


      }
    })
  }, [])




  return (
    <div className="app">
      <Router>

        <Routes>

          <Route path="/" exact element={<LinkedinLogin />} />
          <Route path="/Login&Register" exact element={<Login />} />
          <Route path="/home" exact element={<Home />} />


        </Routes>

      </Router>

      {/*  <LinkedinLogin /> */}

      {/*
      <Header />

      {!user ? (<Login />) : (

        <div className='app__body'>
          <Sidebar />
          <Feed />
          <Widget />
        </div>

      )}

      */}














    </div>
  );
}

export default App;
