import React from 'react';
import './HeaderOptions.css'
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';



function HeaderOptions({ title, Icon, avatar, onClick, name, work }) {

    const user = useSelector((state) => state.user.value)

    console.log(user.photoUrl, 'this is user from headerOption')

    return (
        <div onClick={onClick} className='headerOptions'>

            {Icon && <Icon
                className="headerOptions__icon" />}
            {avatar &&

                (<>

                    <Avatar className="headerOptions__avatar">{user?.email[0]}</Avatar>


                </>
                )
            }
            <div className='headerOptions-with-dropdown-arrow'>
                <h3
                    style={{ display: title ? 'flex' : 'none' }}
                    className='headerOptions__title'>{title}</h3>
                {avatar && <KeyboardArrowDownIcon className='down-arrow-mui' />}
                <h3
                    style={{ display: work ? 'flex' : "none" }}
                    className='headerOptions__work'>{work}</h3>
                <h3
                    style={{ display: name ? 'flex' : "none" }}

                    className='headerOptions__name'>{name}</h3>
                {work && <KeyboardArrowDownIcon
                    style={{ display: work ? 'flex' : "none" }}

                    className='down-arrow-mui' />}

            </div>
        </div>
    );
}

export default HeaderOptions;
