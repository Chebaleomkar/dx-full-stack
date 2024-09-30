import React from 'react'
import LoginLogo from './LoginLogo'
import LoginCard from './LoginCard'

const LoginPage = () => {
return (
    <div className="relative h-screen flex flex-col items-center justify-center lg:grid lg:grid-cols-2">
        <LoginLogo />
        <LoginCard />
    </div>
)}

export default LoginPage
