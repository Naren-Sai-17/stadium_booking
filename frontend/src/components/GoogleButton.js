import React, { useContext, useState } from "react";
import { GoogleOAuthProvider } from 'google-oauth-gsi';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function GoogleButton() {
    // Navigate component
    const Navigate = useNavigate()
    const contextData = useContext(AuthContext)
    let { setUserData } = useContext(AuthContext)
    

    // States for auth tokens and user object.
	let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
    
	const googleProvider = new GoogleOAuthProvider({
		clientId: '361916775522-auuc9gvaqojnjg80amli2bqiqpo0cn9n.apps.googleusercontent.com',
		onScriptLoadError: () => console.log('onScriptLoadError'),
		onScriptLoadSuccess: () => console.log('onScriptLoadSuccess'),
	});

	const login = googleProvider.useGoogleLogin({
		scope: 'profile email openid',
		flow: 'auth-code',
		onSuccess: (res) => {
            // Here success implies the grant of auth code by Google.
			// console.log(res)
			const code = res.code;
			axios.post('http://localhost:8000/dj-rest-auth/google/', { code: code }).then((response) => {
                const login_data = response.data
				console.log(response)

				// Cookies.set('auth', JSON.stringify({ access: response.data.access, refresh: response.data.refresh }), { expires: 365, path: "/" })
				// Cookies.set('user', JSON.stringify({ username: response.data.user.username, email: response.data.user.email, id: response.data.user.pk }), { expires: 365, path: "/" })
				setAuthTokens({ access: login_data.access, refresh: login_data.refresh })
				setUser({ username: login_data.user.username, email: login_data.user.email, id: login_data.user.pk })
                setUserData({ username: login_data.user.username, email: login_data.user.email, id: login_data.user.pk })
				toast.success(`Hi, ${login_data.user.username}!`);
                Navigate('/dashboard')

                // Setting tokens into local storage
                localStorage.setItem('authTokens', JSON.stringify({ access: login_data.access, refresh: login_data.refresh }))
                // localStorage.setItem('authTokens', JSON.stringify(login_data.user))
			}).catch((err) => {
				// if (err.response.data && err.response.data.non_field_errors[0] === "User is already registered with this e-mail address.") {
				// 	toast.error('You have already signed up using Google.');
				// 	return
				// }

				toast.error("An error occured while registering.")
				console.log(err)
			}
			)
		},
		onError: (err) => console.error('Failed to login with Google.', err),
	});
	return (
		<div id="GoogleButton" className="border-0" onClick={() => {
			login()
		}}>
			<button type="button" className="google-button">
				<span className="google-button__icon">
					<svg viewBox="0 0 366 372" xmlns="http://www.w3.org/2000/svg"><path d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z" id="Shape" fill="#EA4335" /><path d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z" id="Shape" fill="#FBBC05" /><path d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z" id="Shape" fill="#4285F4" /><path d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z" fill="#34A853" /></svg>
				</span>
				<span className="google-button__text">Sign in with Google</span>
			</button>
			<style jsx='true'>
				{`
          .google-button {
			height: 40px;
			width:100%;
			border-width: 0;
			background: white;
			color: #737373;
			border-radius: 5px;
			white-space: nowrap;
			box-shadow: 1px 1px 0px 1px rgba(0, 0, 0, 0.05);
			transition-property: background-color, box-shadow;
			transition-duration: 150ms;
			transition-timing-function: ease-in-out;
			padding: 0;
	   }
		.google-button:focus, .google-button:hover {
			box-shadow: 1px 4px 5px 1px rgba(0, 0, 0, 0.1);
	   }
		.google-button:active {
			background-color: #e5e5e5;
			box-shadow: none;
			transition-duration: 10ms;
	   }
		.google-button__icon {
			display: inline-block;
			vertical-align: middle;
			margin: 8px 0 8px 8px;
			width: 18px;
			height: 18px;
			box-sizing: border-box;
	   }
		.google-button__icon--plus {
			width: 27px;
	   }
		.google-button__text {
			display: inline-block;
			vertical-align: middle;
			padding: 0 24px;
			font-size: 14px;
			font-weight: bold;
			font-family: 'Roboto', arial, sans-serif;
	   }
		button ~ button {
			margin-left: 20px;
	   }
		
		  
        `}
			</style>
		</div>
	);
}
