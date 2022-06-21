import { Avatar } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import './Sidebar.css'

function Sidebar() {

    const user = useSelector((state) => state.user.value);

    const recentItem = (topic) => (
        <div className='sidebar__recentItem'>
            <span className='sidebar__hash'>#</span>
            <p>{topic}</p>
        </div>
    )

    return (
        <div className='sidebar'>
            <div className='sidebar__top'>
                <img src="https://media.istockphoto.com/photos/abstract-blue-digital-background-picture-id1146532466?k=20&m=1146532466&s=612x612&w=0&h=NjZrRzJH4nvxVmTGTvMrMrPGQ03fDNYTmRNoEiNSeCQ="
                    alt='' />
                <Avatar src={user.photoUrl} className='sidebar__avatar'>{user.email[0]}</Avatar>
                <h2>{user.displayName}</h2>
                <h4>{user.email}</h4>
            </div>
            <div className='sidebar__stats'>
                <div className='sidebar__stat'>
                    <p>Who view you</p>
                    <p className='sidebar__statNumber'>2,354</p>
                </div>
                <div className='sidebar__stat'>
                    <p>View on post</p>
                    <p className='sidebar__statNumber'>2,000</p>
                </div>

            </div>

            <div className='sidebar__bottom'>
                <p>Recent</p>
                {recentItem('react.js')}
                {recentItem('pyhton')}
                {recentItem('fullstack developer')}
                {recentItem('developer')}
                {recentItem('software developer')}
                {recentItem('softwareengrinnering')}

            </div>



        </div>
    );
}

export default Sidebar;
