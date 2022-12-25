import ServerAPI from "../../API/ServerAPI";
import {useEffect, useState} from "react";

import React from 'react';

const Profile = () => {

    const [profile, setProfile] = useState({name: "zxc", username: "ghoul2010@gmail.com", link: "a4y3bq46y", password: "123"})

    const getProfile = async () => {
        return await ServerAPI.getProfile(localStorage.getItem('auth'))
    }

    useEffect(() => {
        getProfile().then(resp => {
            setProfile(JSON.parse(resp.text))
        })
    }, [])

    return (
        <div>
            <div style={{marginLeft: "100px"}}>
                <div>Name: {profile.name}</div>
                <div>Email: {profile.username}</div>
                <div>Link: {profile.link}</div>
                <div>Password: {profile.password}</div>
            </div>
        </div>
    );
};

export default Profile;