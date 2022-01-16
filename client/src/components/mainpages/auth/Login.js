import React, {useState} from 'react'

const Login = () => {
    const [user, setUser] = useState({
        email: '', password: ''
    })
    return (
        <div>
            Login Component
        </div>
    )
}

export default Login
