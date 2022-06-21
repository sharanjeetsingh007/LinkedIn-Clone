import React, { useEffect, useState } from 'react';
import './Feed.css'
import CreateIcon from '@mui/icons-material/Create';
import InputOptions from './InputOptions';
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import Post from './Post'
import { db } from './firebase';
import FlipMove from 'react-flip-move'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Avatar, Icon } from '@mui/material';


import {
    collection,
    addDoc,
    Timestamp,
    serverTimestamp,
    getDocs,
    onSnapshot,
    doc,
    getDoc,
    orderBy,
    query
} from "firebase/firestore";


import firebase from "firebase/compat/app";
import { useSelector } from 'react-redux';
import ModalPost from './ModalPost';





function Feed() {

    const [input, setInput] = useState("");
    const [posts, setPosts] = useState([]);


    const [modalShow, setModalShow] = useState(false)
    const [loadingSpinner, setLoadingSpinner] = useState(false);


    const user = useSelector((state) => state.user.value)

    useEffect(() => {
        const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));

        onSnapshot(q, (snapshot) => {
            setPosts(snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
            setLoadingSpinner(false)
        });

    }, [])




    const handlePostClick = (e) => {
        e.preventDefault();

        setModalShow(true);

    }

    const close = (value) => {

        setModalShow(value)


    }

    const loadingSpinnerValue = (value) => {
        setLoadingSpinner(value)
        // console.log(loadingSpinner, 'inside function loading spinner')
    }


    // console.log(loadingSpinner, 'this is loading spinner ')

    return (
        <div className='feed'>
            <div className='feed__inputContainer'>
                <div className='feed__inputContainer__inner'>

                    {!user.photoUrl ? <><Avatar style={{ width: '40px', height: '40px' }} src={user.photoUrl}>{user.email[0]}</Avatar></> : <><img src={user.photoUrl} /></>}

                    <div className='feed__input'
                        onClick={handlePostClick}

                    >


                        <button

                            className='post-button'
                            type="text" value={input}
                        // onChange={e => setInput(e.target.value)}
                        // onClick={handlePostClick}
                        >Start a post</button>
                        {/*  <button className='send-post' onClick={sendPost} type='submit'>Send</button> */}

                    </div>
                    <ModalPost handlePostClick={handlePostClick} modalShow={modalShow} close={close} loadingSpinnerValue={loadingSpinnerValue} />

                </div>

                <div className='feed__inputOptions'>

                    <InputOptions title="Photo" Icon={ImageIcon} color="#70B5F9" />
                    <InputOptions title="Video" Icon={SubscriptionsIcon} color="#E7A33E" />
                    <InputOptions title="Event" Icon={EventNoteIcon} color="#C0CBCD" />
                    <InputOptions title="write article" Icon={CalendarViewDayIcon} color="#7FC15E" />


                </div>


            </div>

            {loadingSpinner ? (<div className='spinner-loading'>
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            </div>) : (<div></div>)}


            {/* Post*/}

            <FlipMove>
                {posts.map(({ id, data: { name, description, message, photoUrl, postImageUrl, postVideoUrl } }) => (
                    <Post
                        key={id}
                        id={id}
                        name={name}
                        description={description}
                        message={message}
                        photoUrl={photoUrl}
                        postImageUrl={postImageUrl}
                        postVideoUrl={postVideoUrl}

                    />
                ))


                }
            </FlipMove>


            <Post name="Sharanjeet Singh" description="This is amazing" message="Amanzing message" />


        </div>
    );
}

export default Feed;

