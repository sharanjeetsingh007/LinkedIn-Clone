import React, { useState } from 'react';

import { auth } from './firebase';
import './Login.css';
import { useDispatch } from 'react-redux';
import { login } from './redux/userSlice'
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


import LoadingSpinnerMain from './LoadingSpinnerMain';



function Login() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [pic, setPic] = useState("")
    const [spinner, setSpinner] = useState(false)


    const navigate = useNavigate();

    const dispatch = useDispatch();

    const register = () => {
        setSpinner(true)
        // dispatch(login({ name: 'ji' }))
        console.log('register clicked')

        if (!name || !email || !password) {
            setSpinner(false)


            alert('Please enter a Name,Email & Passwoed')

        }

        auth.createUserWithEmailAndPassword(email, password)
            .then((userAuth) => {
                userAuth.user
                    .updateProfile({
                        displayName: name,
                        photoURL: pic,
                    })
                    .then(() => {
                        dispatch(login({
                            email: userAuth.user.email,
                            uid: userAuth.user.uid,
                            name: name,
                            photo: pic,

                        })
                        );
                    })
                    .then(() => {
                        setSpinner(false)

                        navigate('/home')

                    })
            })
            .catch((error) => {
                setSpinner(false)
                setTimeout(() => {
                    alert(error)

                }, 100)

            });
    }


    const loginToApp = (e) => {
        setSpinner(true)

        if (!email || !password) {
            setSpinner(false)

            alert('Email and Password are empty')

            return;
        }
        console.log('function login run')
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
            .then((userAuth) => {
                console.log(userAuth, 'userAuth from login')
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: userAuth.user.displayName,
                    profileUrl: userAuth.user.photoURL,
                    // authProvider: userAuth.user.providerData[0].providerId,
                }))
            })
            .then(() => {
                setSpinner(false)
                navigate('/home')


            })
            .catch((error) => {

                setSpinner(false)
                setTimeout(() => {

                    alert(error)
                }, 100)

            })




    }



    return (<>
        {spinner == true ? <LoadingSpinnerMain /> :
            <div className='login'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTv5NTn4Iw_QsC7kW0Lbw3LrlPcPAHso2l9A&usqp=CAU" alt='logo' />
                <form>
                    <input placeholder='Full name (Required if registering)' type="text" value={name} onChange={e => setName(e.target.value)} />
                    <input placeholder='Profile pic (Optional)' type="text" value={pic} onChange={e => setPic(e.target.value)} />
                    <input placeholder='Email (Required if registering)' type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input placeholder='Password (Required if registering)' type="password" autoComplete='off' value={password} onChange={e => setPassword(e.target.value)} />
                    <div className='buttons-login-back'>
                        <Link to='/'>
                            <button className='back'>Back</button>
                        </Link>
                        <button className='sign-in-in-login ' onClick={loginToApp}>Sign In</button>

                    </div>

                </form>
                <p>Not a member?{" "}
                    <span className='login__register' onClick={register}>Register Now</span>

                </p>


            </div>
        }
    </>

    );
}

export default Login;
