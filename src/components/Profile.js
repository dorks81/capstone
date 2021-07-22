import React, { useContext } from 'react';
import { UserContext } from "../App";

const Profile = () => {
    const user = useContext(UserContext);

    return (
        <>
            <h1>Profile</h1>
            <h3>Username: {user.username}</h3>
            <p>Email: {user.attributes.email}</p>
        </>
    );
}

export default Profile;
