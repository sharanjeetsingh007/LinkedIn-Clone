import React, { useState } from 'react';
import './LinkedinLogin.css'
// import { } from '@fortawesome/fontawesome-svg-core'
import { faCompass } from '@fortawesome/free-solid-svg-icons'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'
import { faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ReactComponent as LinkedImage } from './images/linkedimage.svg';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';
import { ReactComponent as GoogleIcon } from './images/googleIcon.svg';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from './firebase';
import { useDispatch } from 'react-redux';
import { login } from './redux/userSlice';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import LoadingSpinnerMain from './LoadingSpinnerMain';




function LinkedinLogin() {

    const history = useNavigate();

    const [toggle, setToggle] = useState(false);
    const [spinner, setSpinner] = useState(false)


    const dispatch = useDispatch();

    const handleClick = () => {
        setToggle(!toggle);
        console.log(toggle, 'this is toggle')
    }


    // google authentication

    const auth = getAuth();

    const googleBtnHandler = () => {

        setSpinner(true)

        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const user = result.user;

                // console.log(result, 'result from google')

                dispatch(login({
                    email: user.email,
                    uid: user.uid,
                    displayName: user.displayName,
                    profileUrl: user.photoURL,
                    // authProvider: user.providerData[0].providerId,
                }))
                setSpinner(false)

                history("/home");

            })

            .catch((error) => {
                setSpinner(true)

                return alert(error);

            });

    }





    const fancyButtonsRender = (name, name2, name3, name4, name5,
        name6, name7, name8, name9, name10, name11, name12, name13,
        name14, name15, name16, name17, name18) => {
        return (

            <div className='fancy-buttons' >
                <ul className='fancy-buttons-ul' style={{ height: (!toggle ? '212px' : 'auto'), overflow: (!toggle ? 'hidden' : 'visible') }}>
                    <li className='fancy-buttons-li'>
                        <a href=''>{name}</a>
                    </li>
                    <li className='fancy-buttons-li'>
                        <a href=''>{name2}</a>
                    </li>
                    <li className='fancy-buttons-li'>
                        <a href=''>{name3}</a>
                    </li>
                    <li className='fancy-buttons-li'>
                        <a href=''>{name4}</a>
                    </li>

                    <li className='fancy-buttons-li'>
                        <a href=''>{name5}</a>
                    </li>
                    <li className='fancy-buttons-li'>
                        <a href=''>{name6}</a>
                    </li>
                    <li className='fancy-buttons-li'>
                        <a href=''>{name7}</a>
                    </li>
                    <li className='fancy-buttons-li'>
                        <a href=''>{name8}</a>
                    </li>
                    <li className='fancy-buttons-li'>
                        <a href=''>{name9}</a>
                    </li>
                    <li className='fancy-buttons-li'>
                        <a href=''>{name10}</a>
                    </li>
                    <li className='fancy-buttons-li'>
                        <a href=''>{name11}</a>
                    </li>
                    <li className='fancy-buttons-li'>
                        <a href=''>{name12}</a>
                    </li>
                    <li className='fancy-buttons-li'>
                        <a href=''>{name13}</a>
                    </li>
                    <li className='fancy-buttons-li'>
                        <a href=''>{name14}</a>
                    </li>
                    <li className='fancy-buttons-li'>
                        <a href=''>{name15}</a>
                    </li>
                    <li className='fancy-buttons-li'>
                        <a href=''>{name16}</a>
                    </li>
                    <li className='fancy-buttons-li'>
                        <a href=''>{name17}</a>
                    </li>
                    <li className='fancy-buttons-li'>
                        <a href=''>{name18}</a>
                    </li>

                </ul>
                <button onClick={handleClick}>Show more <KeyboardArrowDownIcon /></button>
            </div>
        )
    }




    return (
        <>
            {spinner == true ? <LoadingSpinnerMain /> :
                <div className='linkedinLogin'>


                    <header>
                        <div className='header-inner'>
                            <nav className='nav'>

                                <div className='header-logo'>
                                    <img src='https://www.edigitalagency.com.au/wp-content/uploads/Linkedin-logo-png.png'
                                        alt='logo' />

                                </div>

                                <div className='header-icons'>
                                    <div className='icons'>

                                        <div className='icon'>
                                            <FontAwesomeIcon
                                                style={{ fontSize: '19px' }}
                                                className='font-icon' icon={faCompass} />
                                            <p>Discover</p>
                                        </div>
                                        <div className='icon'>
                                            <FontAwesomeIcon
                                                style={{ fontSize: '19px' }}

                                                className='font-icon' icon={faUserFriends} />
                                            <p>People</p>

                                        </div>
                                        <div className='icon'>
                                            <FontAwesomeIcon
                                                style={{ fontSize: '19px' }}

                                                className='font-icon' icon={faChalkboardTeacher} />
                                            <p>Learning</p>

                                        </div>
                                        <div className='icon'>
                                            <FontAwesomeIcon
                                                style={{ fontSize: '19px' }}

                                                className='font-icon' icon={faBriefcase} />
                                            <p>Jobs</p>

                                        </div>

                                    </div>


                                </div>
                                <div className='header-join-sighup'>
                                    <Link to='/Login&Register' style={{ textDecoration: 'none' }}>
                                        <div className='join-now'>
                                            Join now
                                        </div>
                                    </Link>
                                    <Link to='/Login&Register' style={{ textDecoration: 'none' }}>
                                        <div className='sign-in'>
                                            Sign in
                                        </div>
                                    </Link>
                                </div>


                            </nav>


                        </div>



                    </header>

                    <main>

                        <section className='section-1'>

                            <div className='section-1-text'>
                                <h2>Welcome to your<br /> professional community</h2>
                                <div className='section-1-text-buttons'>
                                    <button>Search for a job <ArrowForwardIosIcon /></button>
                                    <button>Find a person you know <ArrowForwardIosIcon /></button>
                                    <button>Learn a new skill <ArrowForwardIosIcon /></button>

                                </div>

                                <button
                                    className='google__button__custom'
                                    style={{ marginTop: '45px', height: '65px', fontSize: '17px', color: 'black' }}
                                    onClick={googleBtnHandler}><GoogleIcon /> <span>Sign in with Google</span></button>

                            </div>

                            <div className='section-1-image'>

                                <LinkedImage className='section-1-image-linked' />
                            </div>

                        </section>
                        <section className='section-2'>
                            <div className='inner-section-2'>
                                <div className='section-2-text'>
                                    <h1>Explore topics you <br />are interested in</h1>
                                </div>
                                <div className='section-2-fancy-buttons'>

                                    <h4>CONTENT TOPICS</h4>
                                    {fancyButtonsRender('See All Topic', 'Science and Environment', 'Marketing and Advertising', 'Sales and Retail', 'Technology'
                                        , 'Finance and Marketing', 'health', 'Business and Management', 'Lifestyle and Lesiure', 'Soxiety and Culture', 'Arts and Enterinment',
                                        'Education and Learning', 'Sports and Fitness', 'Careers and Employment', 'Legal', 'Product management', 'Support', 'Real Estate', 'Research', 'Consulting')}

                                </div>
                            </div>

                        </section>

                    </main>


                </div>
            }
        </>
    )
        ;
}

export default LinkedinLogin;
