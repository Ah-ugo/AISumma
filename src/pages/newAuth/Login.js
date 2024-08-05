import { Center, CircularProgress, Heading, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
const [auth, setAuth] = useState({
    email: "",
    password: ""
})
const [loading, setLoading] = useState(false)
const toast = useToast()
const navigate = useNavigate()

    const AuthFunc = async() => {
        setLoading(true)
        const headers = {
            "accept": "application/json",
      "X-Parse-Application-Id": "Ejhu0gpyPCKAo7Z4AA1yTZm0utJbCqPtr3dRPwt3",
      "X-Parse-REST-API-Key": "4zjh2OUB1MLRUxoADsfVB0BHPWFvTbXfCh6roC68",
      "Content-Type": "application/json"
        }
        await axios.get(`https://parseapi.back4app.com/login?username=${auth.email}&password=${auth.password}`,{headers}).then(res=>{
            localStorage.setItem("session", res.data?.sessionToken)
            localStorage.setItem("userId", res.data?.objectId)
            console.log(res)
            setLoading(false)
            if(res.status === 200) {
                toast({
                    title: 'Login Successful',
                    description: "We've logged you in to your account",
                    status: 'success',
                    duration: 5000,
                    // isClosable: true,
                  })
                  navigate("/")
                } else {
                    toast({
                        title: 'Login Unsuccessful',
                        description: "Check your email and password",
                        status: 'error',
                        duration: 5000,
                        // isClosable: true,
                      })  
                }
        }).catch(err=>{
            console.log(err)
            setLoading(false)
            toast({
                title: 'Login Unsuccessful',
                description: "Something went wrong",
                status: 'error',
                duration: 5000,
                // isClosable: true,
              })  
        })
    }
  return (
    <div>
        <div class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl mt-4">
    <div class="hidden bg-cover lg:block lg:w-1/2" style={{backgroundImage: "url('../../Assets/loginBg.jfif')"}}>
        <img className='w-full h-full object-cover' src={require("../../Assets/loginBg.jfif")}/>
    </div>

    <div class="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <div class="flex justify-center mx-auto">
            <Heading>AISumma</Heading>
            {/* <img class="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt=""/> */}
        </div>

        <p class="mt-3 text-xl text-center text-gray-600 ">
            Welcome back!
        </p>

        

        <div class="flex items-center justify-between mt-4">
            <span class="w-1/5 border-b  lg:w-1/4"></span>

            <a href="#" class="text-xs text-center text-gray-500 uppercase  hover:underline">login
                with email</a>

            <span class="w-1/5 border-b  lg:w-1/4"></span>
        </div>

        <div class="mt-4">
            <label class="block mb-2 text-sm font-medium text-gray-600 " for="LoggingEmailAddress">Email Address</label>
            <input onChange={(e)=>setAuth({...auth, email:e.target.value})} id="LoggingEmailAddress" class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300" type="email" />
        </div>

        <div class="mt-4">
            <div class="flex justify-between">
                <label class="block mb-2 text-sm font-medium text-gray-600 " for="loggingPassword">Password</label>
                <a href="#" class="text-xs text-gray-500 hover:underline">Forget Password?</a>
            </div>

            <input onChange={(e)=>setAuth({...auth, password: e.target.value })} id="loggingPassword" class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300" type="password" />
        </div>

        <div class="mt-6">
            <button onClick={()=>AuthFunc()} class="w-full px-6 py-3 text-sm font-medium border border-blue-600 tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-transparent hover:text-blue-600  focus:outline-none focus:ring active:text-blue-500">
                Sign In
            </button>
            {loading?<Center className='mt-3'>
            <CircularProgress isIndeterminate color='blue.600' />
            </Center>:null}
        </div>

        <div class="flex items-center justify-between mt-4">
            <span class="w-1/5 border-b md:w-1/4"></span>

            <a href="/register" class="text-xs text-gray-500 uppercase hover:underline">or sign up</a>

            <span class="w-1/5 border-b md:w-1/4"></span>
        </div>
    </div>
</div>
    </div>
  )
}
