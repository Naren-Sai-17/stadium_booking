import { createContext, useState, useEffect } from 'react'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({ children }) => {
    // a call back func |()=>| is used so that ternary condition is run only once at a reload
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
    let [user_name, setUsername] = useState(() => localStorage.getItem('user_name') ? (localStorage.getItem('user_name')) : null)
    // let [username, setUsername] = useState(null)
    let [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     if(username !== null) { 
    //         toast.success(`Hi, ${user.username}!`)
    //     }
    // }, [username])


    const Navigate = useNavigate()

    let setUserData = (x) => {
        setUsername(x)
    }
    // let set_username = (x) => {
    //     setUser(x)
    // }

    let loginUser = async (e, next_url = '/dashboard') => {
        console.log("loginUser")
        // to prevent default reload
        e.preventDefault()
        let response = await fetch('/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'username': e.target.username.value, 'password': e.target.password.value })
        })
        let data = await response.json()

        if (response.status === 200) {
            let user_data = jwtDecode(data.access)
            setAuthTokens(data)
            setUser(user_data)
            localStorage.setItem('authTokens', JSON.stringify(data))
            console.log(user_data.username)
            localStorage.setItem('username', user_data.username)
            Navigate(next_url)

            toast.success(`Hi, ${localStorage.getItem('username')}!`)
        } else {
            toast.error('Something went wrong!')
        }
    }

    let signupUser = async (e, next_url = '/dashboard') => {
        console.log("SignupUser")
        // console.log(e.target.password.value)
        // console.log(e.target.confirmpassword.value)
        e.preventDefault()
        if (e.target.password.value !== e.target.confirmpassword.value) {
            alert('Passwords don\'t match')
            return;
        }
        let response = await fetch('/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'username': e.target.username.value, 'password': e.target.password.value, 'email': e.target.email.value })
        })

        if (response.status === 201) {
            // setAuthTokens(data)
            // setUser(jwtDecode(data.access))
            // localStorage.setItem('authTokens', JSON.stringify(data))
            
            let response = await fetch('/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'username': e.target.username.value, 'password': e.target.password.value })
            })
            let data = await response.json()
    
            if (response.status === 200) {
                let user_data = jwtDecode(data.access)
                setAuthTokens(data)
                setUser(user_data)
                localStorage.setItem('username', user_data.username)
                localStorage.setItem('authTokens', JSON.stringify(data))
                // console.log(user_data.username)
                // localStorage.setItem('username', user_data.username)
                Navigate(next_url)

                toast.success(`Hi, ${localStorage.getItem('username')}!`)
            } else {
                toast.error('Something went wrong!')
            }
        } else {
            console.log("Failed to register user. Response code:", response.status);
            //return response.text();
            toast.error('An account with that username/email already exists.')
        }
        //will check this later
        // else if(response.status === 400){
        //     alert('Already registered...redirecting to login')
        //     Navigate('/login')
        // }
    }


    let logoutUser = () => {
        console.log("logoutUser")
        if(user !== null) {
            toast.success('Logged out successfully!')
            Navigate('/dashboard')
        }
        setAuthTokens(null)
        setUser(null)
        setUsername('null')
        // localStorage.removeItem('authTokens')
        localStorage.clear()
        // Navigate('/login')
    }



    let updateToken = async () => {

        console.log("updateToken")
        //console.log(authTokens?.refresh)
        //console.log(authTokens.refresh)

        if ((authTokens?.refresh) === undefined) {
           // console.log(authTokens?.refresh)
            logoutUser()
            if (loading) {
                setLoading(false)
            }

        }
        else {
            // const [a, setA] = useState(authTokens.refresh);
            let response = await fetch('/api/token/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'refresh': authTokens?.refresh })
            })

            let data = await response.json()

            if (response.status === 200) {
                setAuthTokens(data)
                // authTokens.refresh=a
                
                
                setUser(jwtDecode(data.access))
                console.log(jwtDecode(data.access))
                localStorage.setItem('authTokens', JSON.stringify(data))
            } else {
                logoutUser()
            }

            if (loading) {
                setLoading(false)
            }
        }
    }
    

    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
        signupUser: signupUser,
        setUserData: setUserData,
        setUser: setUser,
        setAuthTokens: setAuthTokens,
    }


    useEffect(() => {

        if (loading) {
          //  console.log(user)
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4

        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, fourMinutes)
        return () => clearInterval(interval)

    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
