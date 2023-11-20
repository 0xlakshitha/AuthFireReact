import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from 'firebase/auth'
import axios from 'axios'

const Register = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [token, setToken] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then( async (userCredential) => {
        
        const user = userCredential.user

        console.log(user)

        const { data } = await axios.post('http://191.101.1.241/api/auth/signup', {
          userId: user.uid,
          email,
          firstName,
          lastName,
          profilePic: null
        })

        console.log('Access Token', data)

      })
      .catch(error => {
        console.log(error)
      })

    // try {
    //   // const { data } = await axios.patch('https://api.bexvis.com/trading/close-signal', {
    //   //   "signalId": "6482c3cc16cb5293cb5b3d08"
    //   // })
    //   // const { data } = await axios.patch('https://api.bexvis.com/trader/update-settings/MgQ3MaqSmMhz6v6zhjKIU6sdxCH3', {
    //   //   default_laverage: 10,
    //   //   default_risk_percentage: 0.5,
    //   // }, {
    //   //   headers: {
        
    //   //   },
    //   //   withCredentials: true
    //   // })
    //   const { data } = await axios.get('https://api.bexvis.com/trading/signal/64940d83374512f77484d300')

    //   console.log(data)

    //   console.log(data)
    // } catch (error) {
    //   console.log(error.response.data)
    // }

    

    console.log(firstName, lastName, email, password, confirmPassword)
  }

  const registerWithGoogle = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then( async (userCredential) => {
        const user = userCredential.user

        const { data } = await axios.post('http://191.101.1.241/api/auth/signup', {
          userId: user.uid,
          email: user.email,
          firstName: user.displayName.split(' ')[0],
          lastName: user.displayName.split(' ')[1],
          profilePic: user.photoURL
        })

        console.log('Access Token', data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const registerWithGithub = () => {
    signInWithPopup(auth, new GithubAuthProvider())
      .then(async (userCredential) => {
        const user = userCredential.user

        const { data } = await axios.post('http://191.101.1.241/api/auth/signup', {
          userId: user.uid,
          email: user.email,
          firstName: user.displayName.split(' ')[0],
          lastName: user.displayName.split(' ')[1],
          profilePic: user.photoURL
        })

        console.log('Access Token', data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <main className='min-h-screen min-w-full bg-gray-800 grid place-items-center'>
        <div className='mx-auto my-20 w-[25rem] flex flex-col gap-4 rounded-md bg-gray-600 text-white px-6 py-10'>
            <h4 className='text-xl font-semibold tracking-wider'>
                Register
            </h4>

            <form action="#" onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm tracking-widest'>First Name</label>
                    <input type="text" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className='bg-transparent outline-none border rounded-sm px-2 py-2'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-sm tracking-widest'>Last Name</label>
                    <input type="text" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className='bg-transparent outline-none border rounded-sm px-2 py-2'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-sm tracking-widest'>Email</label>
                    <input type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='bg-transparent outline-none border rounded-sm px-2 py-2'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-sm tracking-widest'>Password</label>
                    <input type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className='bg-transparent outline-none border rounded-sm px-2 py-2'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-sm tracking-widest'>Confirm Password</label>
                    <input type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className='bg-transparent outline-none border rounded-sm px-2 py-2'
                    />
                </div>

                <input type="submit" value="Register" className='w-full bg-gradient-to-r from-blue-600 to-pink-500 cursor-pointer py-2 rounded-md' />
            </form>

            <div className='flex items-center justify-between mt-2'>
              <button 
              className='flex px-2 py-1 border rounded-md gap-2 items-center'
              onClick={registerWithGoogle}
              >
                <FcGoogle className='text-4xl' />
                <div className='flex flex-col pl-2 ml-2 border-l'>
                  <small>Register with</small>
                  <h4>Google</h4>
                </div>
              </button>

              <button
              className='flex px-2 py-1 border rounded-md gap-2 items-center'
              onClick={registerWithGithub}
              >
                <FaGithub className='text-4xl' />
                <div className='flex flex-col pl-2 ml-2 border-l'>
                  <small>Register with</small>
                  <h4>Github</h4>
                </div>
              </button>
            </div>

            <Link to='/login' className='text-sm text-center tracking-wider mt-2 underline'>Already have an account? Login</Link>
        </div>
    </main>
  )
}

export default Register