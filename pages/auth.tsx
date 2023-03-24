import Input from "@/components/input";
import { useState, useCallback } from "react";
import axios from "axios";
import { signIn } from 'next-auth/react'
//hook for navigating to different routes
import { useRouter } from 'next/router'

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
    }, [variant]
    )

    const login = useCallback(async () => {
        try {
            //redirect to '/' route upon logging in (but it won't do it automatically since we use redirect: false)
            //instead we do it manually with router.push('/')

            //this code is using the authorize function we wrote in
            // [...nextauth].ts to check our credentials against users in the db
            // and give us a JWT token for our session
            await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: '/'
            })
            router.push('/')
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
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-cover bg-fixed">
            {/* lg applies for large screens - tailwind built for responsive design */}
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                {/* padding x + padding y  */}
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="logo" className="h-12" />
                </nav>
                <div className="flex justify-center">
                    {/* lg:w-2/5 means to give width: 40% on screens <1024px in width */}
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">{variant === "login" ? "Sign In" : "Register"}</h2>
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
                        <button onClick={variant === 'login' ? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                            {variant === "login" ? "Login" : "Sign up"}
                        </button>
                        <p className="text-neutral-500 mt-12">
                            {variant === "login" ? "First time using Netflix?" : "Already have an account?"}
                            <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
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