import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './Header.css'
import HeaderOptions from './HeaderOptions';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AppsIcon from '@mui/icons-material/Apps';
import UserImage from "./images/user.png"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './redux/userSlice';
import { auth } from './firebase';



function Header() {


    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.value)


    const logoutOfApp = () => {

        dispatch(logout());
        auth.signOut();

    }


    return (
        <div className='header'>

            <div className='header-inner-home'>


                <div className='header__left'>

                    <div className='header__image'>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/768px-LinkedIn_logo_initials.png"
                            alt="logo"
                        />
                    </div>

                    <div className='header__search'>

                        <SearchIcon className='search__icon' />
                        <input type="text" placeholder='Search' />
                    </div>




                </div>
                <div className='logout__responsive' onClick={logoutOfApp} ><span>Logout</span></div>



                <div className='header_right'>

                    <HeaderOptions Icon={HomeIcon} title="home" />
                    <HeaderOptions Icon={SupervisorAccountIcon} title="My Network" />
                    <HeaderOptions Icon={BusinessCenterIcon} title="My Network" />
                    <HeaderOptions Icon={ChatIcon} title="My Network" />
                    <HeaderOptions Icon={NotificationsIcon} title="My Network" />
                    <div className='avatar-div-navbar'>
                        <HeaderOptions avatar={true} title="me"
                        >
                        </HeaderOptions>

                        <div className='logout-div' onClick={logoutOfApp} ><span>Logout</span></div>
                    </div>
                    <HeaderOptions Icon={AppsIcon} work="Work" />
                    <HeaderOptions name={<div>Try premium for <br /> free</div>} />




                </div>





            </div>

        </div>
    );
}

export default Header;
