// Profile.js
import React from "react";

const Profile = ({ user, handleLogout }) => {
  return (
    <div style={styles.profile}>
      <h1 style={styles.title}>Welcome, {user.firstName}</h1>
      <img
        src={user.profilePicture || "https://via.placeholder.com/150"}
        alt="Profile"
        style={styles.profileImage}
      />
      <p style={styles.email}>{user.email}</p>
      <button onClick={handleLogout} style={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  profile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    marginBottom: "20px",
  },
  email: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "20px",
  },
  logoutButton: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
  },
};

export default Profile;
