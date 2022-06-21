import React, { useState } from 'react';
import Login from './Login';
import Sidebar from './Sidebar';
import Feed from './Feed';
import Widget from './Widget';
import Header from './Header';
import { useSelector } from 'react-redux';
import LinkedinLogin from './LinkedinLogin';
import { login } from './redux/userSlice';
import ModalPost from './ModalPost';
import { Avatar, Icon } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import { useDispatch } from 'react-redux';
import { messageChange } from './redux/messageSlice';
import LoadingSpinnerMain from './LoadingSpinnerMain';






function Home() {



    const user = useSelector((state) => state.user.value)

    const messageValue = useSelector((state) => state.message.value)

    console.log(messageValue, 'redux messageValue')



    const dispatch = useDispatch();

    const contacts = (name, message, date) => {

        return <div className='message__bar__body__contacts'>



            <div className='message__bar__body__contacts__body__left'>
                <Avatar
                    style={{ height: '35px', width: '35px' }}
                />
                <div className='name__description__contacts'>
                    <h4>{name}</h4>
                    <p>{message}</p>
                </div>

            </div>

            <p className='date__messageBar__custom'>{date}</p>
        </div>


    }


    // console.log(user, 'providerId consrole')


    // const renderUser = (user) => {

    // if (user && user.authProvider == "google.com") {

    //     return (
    //         // console.log('it workes'),
    //         <>
    //             <Header />
    //             <div className='app__body'>
    //                 <Sidebar />
    //                 <Feed />
    //                 <Widget />
    //             </div>

    //         </>
    //     )

    // }

    // if (user && user.authProvider == "password") {
    //     return (
    //         <>
    //             <Header />
    //             <div className='app__body'>
    //                 <Sidebar />
    //                 <Feed />
    //                 <Widget />
    //             </div>

    //         </>

    //     )
    // }






    // else {
    //     return <LinkedinLogin />
    // }




    // }

    const handleMessageClick = () => {

        dispatch(messageChange());


    }


    return <div className='home app'>



        {!user ? (<LinkedinLogin />) : (

            <>
                <Header />
                <div className='app__body'>

                    <Sidebar />
                    <Feed />
                    <Widget />


                    <div className={messageValue === false ? 'message__bar' : 'message__bar__active'}>
                        <div className='message__bar__header' onClick={handleMessageClick}>

                            <div className='message__bar__header__left'>
                                <Avatar className='avatar__messageBar' src={user.photoUrl}>{user.email[0]}</Avatar>
                                <h4>Messaging</h4>
                            </div>
                            <div className='message__bar__header__right'>
                                <MoreHorizIcon
                                    style={{ fontSize: '17px' }}
                                />
                                <span className='btn-margin'><BorderColorIcon
                                    style={{
                                        fontSize: '14px'
                                    }}

                                /></span>

                                {messageValue === false ? <KeyboardArrowUpIcon
                                    style={{
                                        fontSize: '17px'
                                    }}

                                />
                                    : <KeyboardArrowDownIcon
                                        style={{
                                            fontSize: '17px'
                                        }}

                                    />}

                            </div>
                        </div>
                        <div className='message__bar__body'>
                            <div className='message__bar__body__search'>
                                <div className='message__bar__body__search__left'>
                                    <SearchIcon />
                                    <input type="text" placeholder='Search' /></div>
                                <TuneIcon />
                            </div>



                            <div className='message__bar__body__scroll'>

                                {contacts('Elon Musk', 'Nice work', '12 April')}
                                {contacts('Bill Gates', 'Awesome!', '22 June')}
                                {contacts('John Wick', 'Good work', '3 April')}
                                {contacts('Amy', 'Right ', '9 May')}
                                {contacts('Kim', 'All the best', '12 November')}
                                {contacts('Ram', 'Good work', '5 August')}
                                {contacts('Elon Musk', 'Nice work', '12 April')}
                                {contacts('Bill Gates', 'Awesome!', '22 June')}
                                {contacts('John Wick', 'Good work', '3 April')}
                                {contacts('Amy', 'Right ', '9 May')}
                                {contacts('Kim', 'All the best', '12 November')}
                                {contacts('Ram', 'Good work', '5 August')}



                            </div>

                        </div>





                    </div>
                </div>

            </>

            // <>           <ModalPost /></>
        )}




    </div>;
}

export default Home;
