import React,{Component} from 'react';
import { Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { socialLogin, authenticate } from "../auth";

class SocialLogin extends Component {
    constructor() {
        super();
        this.state = {
            redirectToHome: false
        };
    }   

    responseGoogle = response => {
        console.log(response);
        const { googleId, name, email, imageUrl } = response.profileObj;
        const user = {
            password: googleId,
            name: name,
            email: email,
            imageUrl: imageUrl
        };
        // console.log("user obj to social login: ", user);
        socialLogin(user).then(data => {
          //  console.log("signin data: ", data);
            if (data.error) {
                console.log("Error Login. Please try again..");
            } else {
                ///console.log("signin success - setting jwt: ", data);
                authenticate(data);
                    this.setState({ redirectToHome: true });
            }
        });
    };

    render() {
        const { redirectToHome } = this.state;
        console.log(" REDIRECT TO HOME !! " , redirectToHome);
        if (redirectToHome) return <Redirect to="/" />;

        return (
            <div className="container">
                <GoogleLogin
                    clientId="381845043542-idbi7kqc2652h5jbrean684p2vfn7lav.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                />
            </div>
        );
    }
}

export default SocialLogin;
