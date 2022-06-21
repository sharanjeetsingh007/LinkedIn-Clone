import React, { useState } from 'react'
import './ModalPost.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import PublicIcon from '@mui/icons-material/Public';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ImageIcon from '@mui/icons-material/Image';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CircularProgress from '@mui/material/CircularProgress';
import LoadingButton from '@material-ui/lab/LoadingButton';
import LoadingSpinnerMain from './LoadingSpinnerMain';
import { Avatar } from '@mui/material';


import SendIcon from '@mui/icons-material/Send';
import ReactPlayer from 'react-player';
import './UpdateModal.css';
import { Firestore, collection, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import {

    addDoc,
    Timestamp,
    serverTimestamp,
    getDocs,
    onSnapshot,

    getDoc,
    orderBy,
    query
} from "firebase/firestore";



function UpdateModal({ updateValue, setUpdateValue, data, id, spinnerValueChild }) {


    // console.log(data, 'data from post as props')

    const user = useSelector((state) => state.user.value)
    // const [textArea2, setTextArea2] = useState("");
    const [textArea1, setTextArea1] = useState("");

    const [imageBtn, setImageBtn] = useState("")
    // const [imageUrl, setImageUrl] = useState(null)
    const [videoBtn, setVideoBtn] = useState("")
    const [assetArea, setAssetArea] = useState("image")

    const [loadingSpinnerMain, setLoadingSpinnerMain] = useState(false)


    const storage = getStorage();





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


    const UpdateHandleClose = () => {
        setUpdateValue(false)
        setTextArea1("")
        setImageBtn("")
        setAssetArea("image")
        setVideoBtn("")
    }

    const cahnge = (e) => {
        setTextArea1(e.target.value)

        // console.log(e.target.value)

    }


    const updatePost = (id) => {

        spinnerValueChild(true)
        // setLoadingSpinnerMain(true)


        // console.log(id, 'inside updatepost ')
        // console.log(imageBtn.typeOf(), 'imageBtn from image')


        if (!textArea1 && !imageBtn && !videoBtn) {
            // console.log(typeof (imageBtn), 'image btn hererer')
            // setLoadingSpinnerMain(false)
            spinnerValueChild(false)

            alert("Empty post can't be updated")
        } else {




            const userDoc = doc(db, "posts", id)
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

                                // const deleteed = deleteDoc(doc(db, "posts", id));
                                // console.log(deleteed, "deleted")


                                const newFields = { message: textArea1, postImageUrl: url, postVideoUrl: "" }
                                updateDoc(userDoc, newFields)
                                spinnerValueChild(false)
                                // setLoadingSpinnerMain(false)

                                UpdateHandleClose();

                            }
                        })
                }
            );






            if (videoBtn) {

                const newFields = { message: textArea1, postVideoUrl: videoBtn, postImageUrl: "" }
                updateDoc(userDoc, newFields);
                spinnerValueChild(false)
                // setLoadingSpinnerMain(false)


                UpdateHandleClose();

            }



            if (textArea1) {

                // if (textArea1 == "") {
                //     alert('empty field not available')
                // } else {
                const newFields = { message: textArea1 }
                updateDoc(userDoc, newFields);
                spinnerValueChild(false)
                // setLoadingSpinnerMain(false)

                UpdateHandleClose();


                // }

            }


            UpdateHandleClose();

        }


    }


    const handleImageBtn = (value) => {
        setImageBtn("");
        setVideoBtn("");
        setTextArea1("");


        setAssetArea(value);

    }


    const handleVideoBtn = (value) => {
        setImageBtn("");
        setVideoBtn("");
        setTextArea1("");


        setAssetArea(value);
    }



    return (

        <>

            {updateValue == true &&
                <div className='modalpost'>

                    <div className='content'>
                        <div className='content-header'>
                            <h2>Update a post</h2>
                            <div className='cancel-btn-div'
                                onClick={UpdateHandleClose}
                            >
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
                                        <textarea className='content-middle-row-2-input' value={textArea1}
                                            onChange={cahnge}
                                            type='text' placeholder='What do you want to talk about?' />



                                        <input type='file'
                                            id='file'
                                            accept='image/gif, image/jpeg, image/png, video/*'
                                            name='image'

                                            style={{ display: 'none' }}
                                            onChange={handleFileImage}
                                        />


                                        {imageBtn && <img className='file-image-upload' src={URL.createObjectURL(imageBtn)} />}



                                    </div>
                                </> : assetArea === "video" && (
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
                                            <textarea className='content-middle-row-2-input-video' value={textArea1} onChange={e => setTextArea1(e.target.value)} type='text' placeholder='What do you want to talk about?' />

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

                                    <button className='content-footer-row-button'><PublicIcon />Anyone</button>

                                </div>

                                <div className='content-footer-row-post-button-div'>
                                    <LoadingButton
                                        className={textArea1 !== "" || imageBtn !== "" || videoBtn !== "" ? 'loading__button__custom' : 'content-footer-row-post-button'}


                                        onClick={() => updatePost(id)}
                                        endIcon={<SendIcon />}
                                        loading={loadingSpinnerMain}
                                        loadingPosition="end"
                                        variant="contained"
                                    >
                                        Update
                                    </LoadingButton>
                                </div>
                            </div>



                        </div>

                    </div>





                </div>



            }


        </>
    )
}

export default UpdateModal