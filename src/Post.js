import { Avatar } from '@mui/material';
import React, { forwardRef, useState } from 'react';
import InputOptions from './InputOptions';
import './Post.css'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import SendIcon from '@mui/icons-material/Send';
import ReactPlayer from 'react-player';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircularProgress from '@mui/material/CircularProgress';


import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from './firebase';
import UpdateModal from './UpdateModal';





const Post = forwardRef(({ id, name, description, message, photoUrl, postImageUrl, postVideoUrl }, ref) => {

    const data = {
        id,
        name,
        description,
        message,
        photoUrl,
        postImageUrl,
        postVideoUrl,

    }

    console.log(id, 'this is id')

    const [updateModal, setUpdateModal] = useState(false)

    const [updateLoadingSpinner, setUpdateLoadingSpinner] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleDelete = () => {
        const deleteed = deleteDoc(doc(db, "posts", id));
        console.log(deleteed, "deleted")
        setAnchorEl(null);

    }




    const handleUpdate = () => {
        setUpdateModal(true)
        setAnchorEl(null);

    }

    const setUpdateModalValue = (value) => {
        setUpdateModal(value)

    }

    const spinnerValueChild = (value) => {
        setUpdateLoadingSpinner(value)
    }



    return (
        <div ref={ref} className='post' key={id}>
            <div className='post__header'>



                <div className='post__left'>
                    <Avatar
                        className='avatar__post__custom'
                        style={{ maxHeight: '40px', maxWidth: '40px' }}
                        src={photoUrl}>{name[0]}</Avatar>


                    <div className='post__info'>
                        <h2>{name}</h2>
                        <p>{description}</p>

                    </div>
                </div>

                <div className='post__right'>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        style={{ maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px', color: 'black' }}

                    >
                        <MoreVertIcon className='option-btn' />
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleUpdate}>Update</MenuItem>
                        <MenuItem onClick={handleDelete}>Delete</MenuItem>
                    </Menu>

                    <UpdateModal
                        updateValue={updateModal}
                        setUpdateValue={setUpdateModalValue}
                        data={data}
                        id={id}
                        updateloadingSpinnerValue={updateLoadingSpinner}
                        spinnerValueChild={spinnerValueChild} />
                </div>
            </div>
            <div className='post__body'>
                <p>{message}</p>
                <div className='image__post__body' style={{
                    height: !postImageUrl ? 'auto' : '500px',
                    display: updateLoadingSpinner == true ? 'flex' : "block",
                    alignItems: updateLoadingSpinner == true ? 'center' : "",
                    justifyContent: updateLoadingSpinner == true ? 'center' : "",
                }}>






                    {updateLoadingSpinner == true ? (<>

                        <div className='post_loading-spinner-div'
                        >
                            <CircularProgress />
                        </div>
                    </>) :
                        <>
                            {postImageUrl ? <img src={postImageUrl} /> : (<><div></div></>)}
                            {postVideoUrl ? <ReactPlayer width="100%" url={postVideoUrl} /> : (<div></div>)}
                        </>
                    }




                </div>

            </div>

            <div className='post__buttons'>
                <InputOptions Icon={ThumbUpOffAltIcon} title="Like" color="gray" />
                <InputOptions Icon={CommentIcon} title="Comment" color="gray" />
                <InputOptions Icon={ShareIcon} title="Share" color="gray" />
                <InputOptions Icon={SendIcon} title="Send" color="gray" />

            </div>

        </div>
    );
})

export default Post;
