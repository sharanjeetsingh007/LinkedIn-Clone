import React, { useState, useRef } from 'react';
import './ModalPost.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import PublicIcon from '@mui/icons-material/Public';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ImageIcon from '@mui/icons-material/Image';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ReactPlayer from 'react-player';
import LoadingButton from '@material-ui/lab/LoadingButton';


import SendIcon from '@mui/icons-material/Send';

import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { db } from './firebase';
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
import { upload } from './redux/userSlice';
import { Avatar } from '@mui/material';
import LoadingSpinnerMain from './LoadingSpinnerMain';





function ModalPost(props) {

    // props
    const modalShow = props.modalShow;
    const handlePost = props.handlePost;
    const close = props.close;
    const loadingSpinnerValue = props.loadingSpinnerValue;

    // storgae instance
    const storage = getStorage();




    // redux state
    const user = useSelector((state) => state.user.value)



    // const inputFile = useRef(null)
    const [textArea, setTextArea] = useState("");
    const [imageBtn, setImageBtn] = useState("")
    // const [imageUrl, setImageUrl] = useState(null)
    const [videoBtn, setVideoBtn] = useState("")
    const [assetArea, setAssetArea] = useState("image")

    const [loadingSpinnerMain, setLoadingSpinnerMain] = useState(false)







    const handleFileImage = (e) => {
        const image = e.target.files[0];

        if (image) {
            if (image === "" || image === undefined) {
                alert(`provided imgae is not acceptable, it is type ${typeof (image)}`)
                return;
            }
        }

        // console.log(image, "this is from fun ")
        setImageBtn(image);
    }


    console.log(imageBtn, 'iamgeBtn')


    const onImageButtonClick = (image) => {
        // `current` points to the mounted file input element
        // inputFile.current.click();





    };





    // const buttonsPost = (icon) => {



    // }

    const handleClose = () => {

        console.log('clicked')
        close(false);
        setTextArea("")
        setImageBtn("")
        setAssetArea("image")
        setVideoBtn("")

    }

    const sendPost = (e) => {
        e.preventDefault()
        // close(false);
        // setTextArea("")
        // setImageBtn("")
        // setAssetArea("image")
        // setVideoBtn("")

        setLoadingSpinnerMain(true)
        loadingSpinnerValue(true)



        if (!textArea && !imageBtn && !videoBtn) {
            setLoadingSpinnerMain(false)
            loadingSpinnerValue(false)
            alert("Empty post is not valid")


        } else {

            setLoadingSpinnerMain(false)



            // firebase storage 
            const storageRef = ref(storage, `/files/${imageBtn.name}`);
            const uploadTask = uploadBytesResumable(storageRef, imageBtn);




            uploadTask.on("state_changed",

                (snapshot) => {
                    // console.log('Uploaded a blob or file!', snapshot);


                }, (err) => console.log(err),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((url) => {
                            console.log(url, 'this is url')


                            if (imageBtn) {

                                addDoc(collection(db, "posts"), {
                                    name: user.displayName,
                                    description: user.email,
                                    message: textArea,
                                    photoUrl: user.photoUrl || "",
                                    timestamp: serverTimestamp(),
                                    postImageUrl: url,
                                })


                                // close(false);
                                setTextArea("")
                                setImageBtn("")
                                setAssetArea("image")
                                setVideoBtn("")
                                loadingSpinnerValue(false)

                            } else if (videoBtn) {
                                addDoc(collection(db, "posts"), {
                                    name: user.displayName,
                                    description: user.email,
                                    message: textArea,
                                    photoUrl: user.photoUrl || "",
                                    timestamp: serverTimestamp(),
                                    postVideoUrl: videoBtn,
                                })

                                // close(false);
                                setTextArea("")
                                setImageBtn("")
                                setAssetArea("image")
                                setVideoBtn("")
                                loadingSpinnerValue(false)


                            }

                            else {

                                addDoc(collection(db, "posts"), {
                                    name: user.displayName,
                                    description: user.email,
                                    message: textArea,
                                    photoUrl: user.photoUrl || "",
                                    timestamp: serverTimestamp(),
                                    // postImageUrl: url,
                                })
                                // setLoadingSpinnerMain(false)

                                // close(false);
                                setTextArea("")
                                setImageBtn("")
                                setAssetArea("image")
                                setVideoBtn("")
                                loadingSpinnerValue(false)


                            }


                        })

                    // close(false);

                }
            );


            close(false);



        }


        // console.log(addingToFirebase, 'Firebase data added')



    }


    const handleImageBtn = (value) => {
        setImageBtn("")
        setVideoBtn("")
        setTextArea("")


        setAssetArea(value)

    }

    const handleVideoBtn = (value) => {
        setImageBtn("")
        setVideoBtn("")
        setTextArea("")


        setAssetArea(value)
    }


    // console.log(user)


    return (
        <>

            {modalShow === true &&

                <div className='modalpost'>

                    <div className='content'>
                        <div className='content-header'>
                            <h2>Create a post</h2>
                            <div className='cancel-btn-div' onClick={handleClose}>
                                <FontAwesomeIcon className='content-header-cancel-icon' icon={faTimes} />
                            </div>

                        </div>
                        <div className='content-middle'>
                            {assetArea === "image" ?
                                <>
                                    <div className='content-middle-row-1'>
                                        <Avatar
                                            className='avatar__modal__custom'
                                            src={user.photoUrl} alt='user' >{user.email[0]}</Avatar>
                                        <div className='content-middle-row-1-name-user'>
                                            <h4>{user.displayName}</h4>
                                            <button><PublicIcon />Anyone<ArrowDropDownIcon /></button>
                                        </div>
                                    </div>
                                    <div className='content-middle-row-2'>
                                        <textarea className='content-middle-row-2-input' value={textArea} onChange={e => setTextArea(e.target.value)} type='text' placeholder='What do you want to talk about?' />
                                        <input type='file'
                                            id='file'
                                            accept='image/gif, image/jpeg, image/png, video/*'
                                            name='image'
                                            // ref={inputFile}
                                            style={{ display: 'none' }}
                                            onChange={handleFileImage}
                                        />

                                        {imageBtn && <img className='file-image-upload' src={URL.createObjectURL(imageBtn)} />}



                                    </div>
                                </>
                                : assetArea === "video" && (
                                    <>
                                        <div className='content-middle-row-1'>
                                            <Avatar
                                                className='avatar__modal__custom'
                                                src={user.photoUrl} alt='user' >{user.email[0]}</Avatar>
                                            <div className='content-middle-row-1-name-user'>
                                                <h4>{user.displayName}</h4>
                                                <button><PublicIcon />Anyone<ArrowDropDownIcon /></button>
                                            </div>
                                        </div>
                                        <div className='content-middle-row-2-video'>
                                            <textarea className='content-middle-row-2-input-video' value={textArea} onChange={e => setTextArea(e.target.value)} type='text' placeholder='What do you want to talk about?' />

                                            <div className='video__link__input__div'>
                                                <input className='video__link__input'
                                                    type="text"
                                                    placeholder='Place the video link'
                                                    id='video'
                                                    value={videoBtn}
                                                    onChange={e => setVideoBtn(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        {videoBtn && (
                                            <ReactPlayer width='100%' url={videoBtn} />
                                        )}

                                    </>)
                            }

                        </div>
                        <div className='content-footer'>

                            <button className='content-footer-hashtag-button'>Add hashtag</button>

                            <div className='content-footer-row'>
                                <div className='content-footer-row-icons'>
                                    <label htmlFor='file'>
                                        <div className='icon-content-footer-modal'
                                            onClick={() => handleImageBtn("image")}

                                        >

                                            <ImageIcon className='icon-content-footer-modal-icon-is' />
                                        </div>
                                    </label>
                                    <label htmlFor='video'>
                                        <div className='icon-content-footer-modal'
                                            onClick={() => handleVideoBtn("video")}
                                        >
                                            <YouTubeIcon className='icon-content-footer-modal-icon' />
                                        </div>
                                    </label>
                                    <div className='icon-content-footer-modal'>
                                        <PublicIcon className='icon-content-footer-modal-icon' />
                                    </div>
                                    <div className='icon-content-footer-modal'>
                                        <PublicIcon className='icon-content-footer-modal-icon' />
                                    </div>
                                    <div className='icon-content-footer-modal'>
                                        <PublicIcon className='icon-content-footer-modal-icon' />
                                    </div>
                                    <div className='icon-content-footer-modal'>
                                        <PublicIcon className='icon-content-footer-modal-icon' />
                                    </div>
                                    <div className='icon-content-footer-modal'>
                                        <PublicIcon className='icon-content-footer-modal-icon' />
                                    </div>

                                    <button className='content-footer-row-button'><PublicIcon className='icon-content-footer-modal-icon' />Anyone</button>

                                </div>

                                <div className='content-footer-row-post-button-div'>
                                    {/** 
                                    <button
                                        className='content-footer-row-post-button'
                                        style={{ backgroundColor: textArea !== "" || imageBtn !== "" || videoBtn !== "" ? '#0A65C3' : '#EBEAEA', color: textArea || imageBtn || videoBtn ? 'white' : '#A4A4A4' }}
                                        onClick={sendPost}
                                    >Post</button>

*/}
                                    <LoadingButton
                                        className={textArea !== "" || imageBtn !== "" || videoBtn !== "" ? 'loading__button__custom' : 'content-footer-row-post-button'}


                                        onClick={sendPost}
                                        endIcon={<SendIcon />}
                                        loading={loadingSpinnerMain}
                                        loadingPosition="end"
                                        variant="contained"
                                    >
                                        Send
                                    </LoadingButton>

                                </div>
                            </div>



                        </div>

                    </div>





                </div>


            }
        </>

    );
}

export default ModalPost;
