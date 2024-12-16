import React, { useState } from "react";
import { FaLock, FaRegEdit, FaMoon, FaSun } from "react-icons/fa"; // Icons from React Icons
import "./SettingPage.css";
import AppButton from "../../components/button/AppButton";
import AppInput from "../../components/input/AppInput";
import Modal from "../../components/model/Modal";
import { notifyError } from "../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { DeleteUsersThunk, UpdateUserThunk } from "../../redux/thunk/AuthThunk";

const SettingPage = () => {
  const { loginData } = useSelector((state) => state.userReducer);

  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  // const [isEditing, setIsEditing] = useState(false);
  const [editShowModal, setEditShowModal] = useState(false);
  const [deleteUserShowModal, setDeleteUserShowModal] = useState(false);
  const [editData, setEditData] = useState({});

  const [profileImage, setProfileImage] = useState(
    loginData?.user?.profileImage ?? null
  );
  const [username, setUsername] = useState(loginData?.user?.username); // State for the username

  const dispatch = useDispatch();

  const changePasswordHandler = (e) => {
    setEditShowModal(!editShowModal);
  };

  const deleteUserHandler = (e) => {
    setDeleteUserShowModal(!deleteUserShowModal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleImageUpload = (event) => {
    const fileInput = event.target; // Get the input element
    const file = fileInput.files[0];

    if (file) {
      const maxSizeInMB = 5;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

      if (file.size > maxSizeInBytes) {
        notifyError(`File size should bellow ${maxSizeInMB} MB`);
        fileInput.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result); // Set the uploaded image
        fileInput.value = "";
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    dispatch(
      UpdateUserThunk({
        userId: loginData?.user?.id,
        profileImage,
        username,
      })
    );
  };

  return (
    <div className={"settings-container"}>
      <div className="name-home-container">
        <h1>Settings</h1>
        <p>Manage your preferences and account settings.</p>
      </div>

      <section className="settings-section">
        {/* Edit Profile */}
        <div className="setting-card">
          <div className="profile-image-wrapper">
            <div className="profile-image-circle">
              <label htmlFor="upload-image" className="edit-icon">
                <FaRegEdit />
              </label>
              <img
                src={profileImage || "https://via.placeholder.com/150"}
                alt="Profile"
                className="profile-image"
              />
              <input
                id="upload-image"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </div>
          </div>
          <div className="setting-content">
            <h3>Edit Profile</h3>
            <p>Edit your profile image and username.</p>
            {/* <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="username-input"
              placeholder="Enter your username"
            /> */}
            <div style={{ display: "flex" }}>
              <div>
                <AppInput
                  type="text"
                  name={"user-name"}
                  placeholder="UserName"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <AppButton
                label="Save"
                className="setting-button"
                onClick={handleSave}
              />
            </div>
          </div>
        </div>

        {/* Theme Settings */}
        {/* <div className="setting-card">
          {darkMode ? <FaMoon className="icon" /> : <FaSun className="icon" />}
          <div className="setting-content">
            <h3>Theme</h3>
            <p>Switch between light and dark mode.</p>
            <AppButton
              label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className={"setting-button"}
              onClick={() => {
                // setEditShowModal(false);
                // setEditData({});
                toggleDarkMode();
              }}
            />
          </div>
        </div> */}

        {/* Notifications Settings */}
        {/* <div className="setting-card">
          <FaCog className="icon" />
          <div className="setting-content">
            <h3>Notifications</h3>
            <p>Enable or disable notifications.</p>
            <label className="switch">
              <input
                type="checkbox"
                checked={notifications}
                onChange={toggleNotifications}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div> */}

        {/* Security Settings */}
        <div className="setting-card">
          <FaLock className="icon" />
          <div className="setting-content">
            <h3>Security</h3>
            <p>Manage your account security settings.</p>
            <AppButton
              label={"Change Password"}
              className={"setting-button"}
              onClick={() => {
                changePasswordHandler();
              }}
            />
            <AppButton
              className="delete-btn"
              label={"Delete User"}
              onClick={() => {
                setDeleteUserShowModal(true);
              }}
            />
          </div>
        </div>

        {/* Social Links */}
        {/* <div className="setting-card">
          <FaUser className="icon" />
          <div className="setting-content">
            <h3>Social Links</h3>
            <p>Connect or disconnect your social media accounts.</p>
            <button className="setting-button">Link Social Account</button>
          </div>
        </div> */}
      </section>
      <Modal
        isOpen={editShowModal}
        onClose={() => {
          setEditShowModal(false);
          setEditData({});
        }}
      >
        <h3>Change Password</h3>
        <span>Password:</span>
        <input
          type="text"
          id="password"
          name="password"
          value={editData.password}
          onChange={handleInputChange}
          className="modal-input"
        />

        <span>Confirm Password:</span>
        <input
          type="text"
          id="confirm-password"
          name="confirmPassword"
          value={editData.confirmPassword}
          onChange={handleInputChange}
          className="modal-input"
        />

        <div className="modal-buttons">
          <AppButton
            label="Done"
            className={"done-btn"}
            onClick={() => {
              if (editData.password !== editData.confirmPassword) {
                notifyError(
                  "Pelase check password and confirm password should be same!"
                );
                return;
              }
              dispatch(
                UpdateUserThunk({
                  userId: loginData?.user?.id,
                  changePassword: editData?.password,
                })
              );
              setEditShowModal(false);
              setEditData({});
            }}
          />
          <AppButton
            label="Cancel"
            className={"cancel-btn"}
            onClick={() => {
              setEditShowModal(false);
              setEditData({});
            }}
          />
        </div>
      </Modal>
      <Modal
        isOpen={deleteUserShowModal}
        onClose={() => {
          setDeleteUserShowModal(false);
        }}
      >
        <h3>Are you sure want to delete user?</h3>

        <div className="modal-buttons">
          <AppButton
            label="Done"
            className={"done-btn"}
            onClick={() => {
              dispatch(DeleteUsersThunk({ userId: loginData?.user?.id }));
              setDeleteUserShowModal(false);
            }}
          />
          <AppButton
            label="Cancel"
            className={"cancel-btn"}
            onClick={() => {
              setDeleteUserShowModal(false);
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default SettingPage;
