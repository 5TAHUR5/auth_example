import React from 'react';
import cl from './GoogleOauth.module.css'
import {GoogleLogin} from "react-google-login";

const GoogleOauth = ({onSuccess, clientId, onFailure}) => {
    return (
        <GoogleLogin
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            className={cl.google}
            isSignedIn={true}
        />
    );
};

export default GoogleOauth;