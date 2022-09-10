import React, { useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import { uploadImage, uploadPost } from "../../actions/uploadAction";

const PostShare = () => {
  const loading = useSelector((state)=>state.postReducer.uploading)
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const desc = useRef()
  const dispatch = useDispatch()
  const {user} = useSelector((state)=>state.AuthReducer.authData)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const reset = () =>{
    setImage(null)
    desc.current.value = ""
  }

  const handleShare = (e) =>{
        e.preventDefault()
        const newPost = {
          userId: user._id,
          desc: desc.current.value
        }

        if(image){
          const data = new FormData()
          const filename = Date.now() + image.name
          data.append("name", filename)
          data.append("file",image)
          newPost.image = filename
          console.log(newPost)
          try {
            dispatch(uploadImage(data))
          } catch (error) {
            console.log(error)
          }
          dispatch(uploadPost(newPost))
          reset()
        } 
  }

  return (
    <div className="postShare">
      <img src={user.profilePicture? serverPublic + user.profilePicture : serverPublic + "defaultprofile.png"} alt="" />
      <div>
        <input ref = {desc}  required type="text" placeholder="What's happening" />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo" }}
            onClick={() => imageRef.current.click()}
          >
            <span class="material-symbols-sharp">image</span>
            <span>Photo</span>
          </div>
          <div className="option" style={{ color: "var(--video" }}>
            <span class="material-symbols-sharp">play_circle</span>
            <span>Video</span>
          </div>
          <div className="option" style={{ color: "var(--location" }}>
            <span class="material-symbols-sharp">pin_drop</span>
            <span>Location</span>
          </div>
          <div className="option" style={{ color: "var(--shedule" }}>
            <span class="material-symbols-sharp">calendar_month</span>
            <span>Shedule</span>
          </div>
          <button className="button ps-button" onClick={handleShare} disabled={loading}>
            {loading? "Uploading...": "Share"}
          </button>

          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              onChange={onImageChange}
              ref={imageRef}
            />
          </div>
        </div>
        {image && (
          <div className="prevImage">
            <span class="material-symbols-sharp" onClick={() => setImage(null)}>
              close
            </span>
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}; 

export default PostShare; 
