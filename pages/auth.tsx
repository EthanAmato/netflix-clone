import Input from "@/components/input";
import { useState, useCallback } from "react";
import axios from "axios";
import { signIn } from 'next-auth/react'
//hook for navigating to different routes
import { useRouter } from 'next/router'

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const Auth = () => {
    const router = useRouter();
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    // we're going to use it to swap between login and registration
    const [variant, setVariant] = useState('login');

    //without useCallback - which provides a memoized variant of our callback function - the togglevariant function
    //would be needlessly rerendered with each rerendendering of the page
    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
    }, []
    )

    const login = useCallback(async () => {
        try {
            //redirect to '/' route upon logging in (but it won't do it automatically since we use redirect: false) (this code has since changed)
            //instead we do it manually with router.push('/')

            //this code is using the authorize function we wrote in
            // [...nextauth].ts to check our credentials against users in the db
            // and give us a JWT token for our session
            await signIn('credentials', {
                email,
                password,
                callbackUrl: '/profiles'
            })
        } catch (error) {
            console.log(error);
        }
    }, [email, password])

    const register = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                email,
                name,
                password,
            })
            login();
        } catch (error) {
            console.log(error)
        }
    }, [email, name, password, login])


    return (
        // square brackets let us put the url() command from css into tailwind
        <div className="relative h-full w-full bg-[url('/Images/hero.jpg')] bg-no-repeat bg-cover bg-fixed">
            {/* lg applies for large screens - tailwind built for responsive design */}
            <div className="w-full h-full bg-black lg:bg-opacity-50">
                {/* padding x + padding y  */}
                <nav className="px-12 py-5">
                    <img src="/Images/logo.png" alt="logo" className="h-12" />
                </nav>
                <div className="flex justify-center">
                    {/* lg:w-2/5 means to give width: 40% on screens <1024px in width */}
                    <div className="self-center w-full px-16 py-16 mt-2 bg-black rounded-md bg-opacity-70 lg:w-2/5 lg:max-w-md">
                        <h2 className="mb-8 text-4xl font-semibold text-white">{variant === "login" ? "Sign In" : "Register"}</h2>
                        <div className="flex flex-col gap-4">
                            {variant === "register" && (
                                <Input
                                    id="name"
                                    type="text"
                                    label="Username"
                                    onChange={(e: any) => { setName(e.target.value) }}
                                    value={name}
                                />
                            )
                            }
                            <Input
                                id="email"
                                type="email"
                                label="Email"
                                onChange={(e: any) => { setEmail(e.target.value) }}
                                value={email}
                            />
                            <Input
                                id="password"
                                type="password"
                                label="Password"
                                onChange={(e: any) => { setPassword(e.target.value) }}
                                value={password}
                            />
                        </div>
                        <button onClick={variant === 'login' ? login : register} className="w-full py-3 mt-10 text-white transition bg-red-600 rounded-md hover:bg-red-700">
                            {variant === "login" ? "Login" : "Sign up"}
                        </button>
                        <div className="flex flex-row items-center justify-center gap-4 mt-8">
                            <div
                                onClick={() => signIn('google', { callbackUrl: "/profiles" })}

                                className="flex items-center justify-center w-10 h-10 transition bg-white rounded-full cursor-pointer  hover:opacity-80">
                                <FcGoogle />
                            </div>
                            <div
                                onClick={() => signIn('github', { callbackUrl: "/profiles" })}
                                className="flex items-center justify-center w-10 h-10 transition bg-white rounded-full cursor-pointer  hover:opacity-80">
                                <FaGithub />
                            </div>
                        </div>
                        <p className="mt-12 text-neutral-500">
                            {variant === "login" ? "First time using Netflix?" : "Already have an account?"}
                            <span onClick={toggleVariant} className="ml-1 text-white cursor-pointer hover:underline">
                                {variant === "login" ? "Create an Account" : "Login"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Auth;