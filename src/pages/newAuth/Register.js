import { Center, CircularProgress, Heading, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../context/Context'

export default function Register() {
    const [auth, setAuth] = useState({
        email: "",
        password: "",
        passwordConfirmation: ""
    })
    const {GetDetails} = useContext(Context)
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const navigate = useNavigate()

    const AuthFunc = async(e) => {

        e.preventDefault();
        if (auth.password !== auth.passwordConfirmation) {
            toast({
                title: 'Password Mismatch',
                description: "Passwords do not match",
                status: 'error',
                duration: 5000,
            });
            return;
        }
        setLoading(true)
        const headers = {
            "accept": "application/json",
            "X-Parse-Application-Id": "Ejhu0gpyPCKAo7Z4AA1yTZm0utJbCqPtr3dRPwt3",
            "X-Parse-REST-API-Key": "4zjh2OUB1MLRUxoADsfVB0BHPWFvTbXfCh6roC68",
            "X-Parse-Revocable-Session": "1",
            "Content-Type": "application/json"
          };
      
          const varia = {
            "username": auth.email,
            "email": auth.email,
            "password": auth.password
          };
              console.log(varia, "varia")
        await axios.post(`https://parseapi.back4app.com/users`,varia, {headers}).then(res=>{
            localStorage.setItem("session", res.data?.sessionToken)
            localStorage.setItem("userId", res.data?.objectId)
            GetDetails()
            console.log(res)
            setLoading(false)
            if(res.status === 201) {
                toast({
                    title: 'Account created.',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 5000,
                    // isClosable: true,
                  })
                  navigate("/")
                } else {
                    toast({
                        title: 'Registration Unsuccessful',
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
                title: 'Registration Unsuccessful',
                description: "Something went wrong",
                status: 'error',
                duration: 5000,
                // isClosable: true,
              })  
        })
    }
  return (
    <div>
       

<section className="bg-white">
  <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
    <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
      <img
        alt=""
        src={require("../../Assets/loginBg.jfif")}
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />

      <div className="hidden lg:relative lg:block lg:p-12">
        <a className="block text-white" href="#">
          <span className="sr-only">Home</span>
          <Heading>AISumma</Heading>
        </a>

        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Welcome to AISumma
        </h2>

        <p className="mt-4 leading-relaxed text-white/90">
        Effortlessly summarize your PDF files using advanced AI technology. Transform lengthy documents into concise, insightful summaries in no time.
        </p>
      </div>
    </section>

    <main
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >
      <div className="max-w-xl lg:max-w-3xl">
        <div className="relative -mt-16 block lg:hidden">
          <a
            className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
            href="#"
          >
            <span className="sr-only">Home</span>
           <Heading>AISumma</Heading>
          </a>

          <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            Welcome to AISumma
          </h1>

          <p className="mt-4 leading-relaxed text-gray-500">
          Effortlessly summarize your PDF files using advanced AI technology. Transform lengthy documents into concise, insightful summaries in no time.
          </p>
        </div>

        <main className="mt-8 grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>

            <input
              type="text"
              id="FirstName"
              name="first_name"
              className="block w-full mt-1 px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>

            <input
              type="text"
              id="LastName"
              name="last_name"
              className="block w-full mt-1 px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="col-span-6">
            <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>

            <input
              type="email"
              id="Email"
              name="email"
              onChange={(e)=>setAuth({...auth, email: e.target.value})}
              className="block w-full mt-1 px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

            <input
              type="password"
              id="Password"
              name="password"
              onChange={(e)=>{setAuth({...auth, password:e.target.value})}}
              className="block w-full mt-1 px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
              Password Confirmation
            </label>

            <input
              type="password"
              id="PasswordConfirmation"
              name="password_confirmation"
              onChange={(e)=>{setAuth({...auth, passwordConfirmation:e.target.value})}}
              className="block w-full mt-1 px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="col-span-6">
            <label htmlFor="MarketingAccept" className="flex gap-4">
              <input
                type="checkbox"
                id="MarketingAccept"
                name="marketing_accept"
                className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
              />

              <span className="text-sm text-gray-700">
                I want to receive emails about events, product updates and company announcements.
              </span>
            </label>
          </div>

          <div className="col-span-6">
            <p className="text-sm text-gray-500">
              By creating an account, you agree to our
              <a href="#" className="text-gray-700 underline"> terms and conditions </a>
              and
              <a href="#" className="text-gray-700 underline">privacy policy</a>.
            </p>
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button onClick={AuthFunc}
              className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
            >
              Create an account
            </button>

            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
              Already have an account?
              <a href="/login" className="text-gray-700 underline">Log in</a>.
            </p>
          </div>

          {loading?<Center className='mt-3'>
            <CircularProgress isIndeterminate color='blue.600' />
            </Center>:null}
        </main>
      </div>
    </main>
  </div>
</section>
    </div>
  )
}
