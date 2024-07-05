import React, { useEffect, useLayoutEffect, useState } from "react";
import PageMenu from "../../components/PageMenu";
import Card from "../../components/Card";
import ProfileImg from "../../assets/profile.png";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  getUsers,
  updateUser,
} from "../../redux/features/auth/authSlice";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import Notification from "../../components/Notification";

const cloud_name = import.meta.env.VITE_REACT_APP_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_REACT_APP_UPLOAD_PRESET;

const Profile = () => {
  useRedirectLoggedOutUser("/login");
  const { isLoading, user, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const initialState = {
    name: user?.name || "Gyan",
    email: user?.email || "example.com",
    phone: user?.phone || "+91-",
    bio: user?.bio || "Tell me about Yourself",
    photo: user?.photo || "",
    role: user?.role || "",
    isVerified: user?.isVerified || false,
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    let imageURL;

    try {
      if (
        profileImage !== null &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/png" ||
          profileImage.type === "image/jpg")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", cloud_name);
        image.append("upload_preset", upload_preset);

        // save image to cloudinary
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          {
            method: "post",
            body: image,
          }
        );

        imageURL = imgData.url.toString();
      }

      // save to mongoDB
      const userData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        photo: profileImage ? imageURL : profile.photo,
      };

      dispatch(updateUser(userData));
    } catch (error) {
      toast.error(error.message);
    }
  };

  useLayoutEffect(() => {
    if (user) {
      setProfile({
        ...profile,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        photo: user?.photo,
        bio: user?.bio,
        role: user?.role,
        isVerified: user?.isVerified,
      });
    }
  }, [user]);

  return (
    <>
      {isLoading && <Loader />}
      {!profile?.isVerified && <Notification />}

      <section className="max-w-4xl mx-auto my-6 space-y-10">
        <PageMenu />

        <div className="space-y-4">
          <h1 className="text-2xl">Profile</h1>
          <Card className="w-[20rem] xl:w-[25rem] border">
            {isLoggedIn && (
              <div className="space-y-4">
                {/* Profile Image  */}
                <div className="bg-cyan-400 flex flex-col justify-center items-center rounded-md py-3">
                  <img
                    src={imagePreview === null ? profile?.photo : imagePreview}
                    alt="profile image"
                    className="w-52 h-52 object-fill rounded-full mx-auto"
                  />
                  <p className="text-white font-semibold">
                    Role: {profile?.role}
                  </p>
                </div>

                {/* PROFILE FORM */}
                <form className="space-y-4" onSubmit={saveProfile}>
                  <div className="space-y-1">
                    <label>Change Photo:</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                      onChange={handleImageChange}
                      className="inputColor"
                    />
                  </div>

                  <div className="space-y-1">
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={profile?.name}
                      onChange={handleInputChange}
                      className="inputColor"
                    />
                  </div>

                  <div className="space-y-1">
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={profile?.email}
                      onChange={handleInputChange}
                      className="inputColor disabled:bg-gray-200 disabled:text-gray-500"
                      disabled
                    />
                  </div>

                  <div className="space-y-1">
                    <label>Phone:</label>
                    <input
                      type="text"
                      name="phone"
                      value={profile?.phone}
                      onChange={handleInputChange}
                      className="inputColor"
                    />
                  </div>

                  <div className="space-y-1">
                    <label>Bio:</label>
                    <textarea
                      type="text"
                      name="bio"
                      cols="30"
                      rows="10"
                      value={profile?.bio}
                      onChange={handleInputChange}
                      className="inputColor"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="text-white bg-blue-500"
                    name="Update Profile"
                  />
                </form>
              </div>
            )}
          </Card>
        </div>
      </section>
    </>
  );
};

export default Profile;

export const shortenText = (text, n) => {
  if (text.length > n) {
    const shortenedText = text.substring(0, n).concat("...");
    return shortenedText;
  }

  return text;
};

export const UserName = () => {
  const { user } = useSelector((state) => state.auth);
  const userName = user?.name || "...";

  return <p>Hi, {shortenText(userName, 10)} | </p>;
};
