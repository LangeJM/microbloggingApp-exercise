import {firebaseUi, firebase} from './firebase.js'

//Most of belows code was taken from the https://firebase.google.com/docs/auth/web/firebaseui in an attempt to speed things up and return with a more custom solution later on if time permits.
const SignIn = (props) => {

    const uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            return true;
            },
            uiShown: function() {
            document.getElementById('loader').style.display = 'none';
            }
        },
        signInFlow: 'popup',
        signInSuccessUrl: 'home',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        // Terms of service url.
        tosUrl: 'https://en.wikipedia.org/wiki/Terms_of_service',
        // Privacy policy url.
        privacyPolicyUrl: 'https://en.wikipedia.org/wiki/Privacy_policy'
    };
    
    firebaseUi.start('#firebaseui-auth-container', uiConfig);    

    return (
        <div className="p-3 my-1 d-flex justify-content-center App align-items-center">
            <div className="px-2 mb-2 mx-0">
                <h1>Welcome to my Microblogging App</h1>
                <div id="firebaseui-auth-container"></div>
                <div id="loader">Loading...</div>
            </div>
        </div>
    )
}

export default SignIn