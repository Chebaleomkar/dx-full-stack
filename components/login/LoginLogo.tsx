
import Image from "next/image";

const LoginLogo = () => {
return (
    <div className="hidden h-full flex-col lg:flex rounded-sm lg:flex-col lg:items-center lg:justify-center lg:p-10 relative">
        <Image
            src="/images/logo.jpeg"
            layout="fill"
            objectFit="cover"
            alt="logo"
            className="absolute inset-0 w-full h-full object-cover rounded-sm "
        />
        </div>
)}

export default LoginLogo
