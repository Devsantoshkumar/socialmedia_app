import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/uploadAction";
import { updateUser } from "../../actions/userAction";

function ProfileModal({ modelOpened, setModelOpened, data }) {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFromData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();
  // const { user } = useSelector((state) => state.AuthReducer.authData);

  const handleForm = (e) => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
  };

  const chageImage = (e) => {
    if(e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      e.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const filename = Date.now() + profileImage.name;
      data.append("name", filename);
      data.append("file", profileImage);
      UserData.profilePicture = filename;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const filename = Date.now() + coverImage.name;
      data.append("name", filename);
      data.append("file", coverImage);
      UserData.coverPicture = filename;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(updateUser(param.id, UserData));
    setModelOpened(false);
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modelOpened}
      onClose={() => setModelOpened(false)}
    >
      <form className="infoForm">
        <h3>Your info</h3>
        <div>
          <input
            type="text"
            name="firstname"
            placeholder="First name"
            className="infoInput"
            onChange={handleForm}
            value={formData.firstname}
          />
          <input
            type="text"
            name="lastname"
            placeholder="last name"
            className="infoInput"
            onChange={handleForm}
            value={formData.lastname}
          />
        </div>
        <div>
          <input
            type="text"
            name="workat"
            placeholder="Work at"
            className="infoInput"
            onChange={handleForm}
            value={formData.workat}
          />
        </div>
        <div>
          <input
            type="text"
            name="livesin"
            placeholder="lives in"
            className="infoInput"
            onChange={handleForm}
            value={formData.livesin}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="infoInput"
            onChange={handleForm}
            value={formData.country}
          />
        </div>
        <div>
          <input
            type="text"
            name="relationship"
            placeholder="Relationship"
            className="infoInput"
            onChange={handleForm}
            value={formData.relationship}
          />
        </div>
        <div>
          Profile Image
          <input type="file" name="profileImage" onChange={chageImage} />
          Cover Image
          <input type="file" name="coverImage" onChange={chageImage} />
        </div>
        <button className="button info-button" onClick={handleSubmit}>
          Update
        </button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
