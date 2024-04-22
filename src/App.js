import React, { useState } from 'react';
import './App.css';
import { Welcome } from './Screens/Welcome';
import './bootstrap-5.3.0-alpha1-dist/css/bootstrap.min.css'
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';

function App() {

  const [IsWelcome, setIsWelcome] = useState(true)
  const [IsLogin, setIsLogin] = useState(false)
  const [IsSignUp, setIsSignUp] = useState(false)

  const handleClick1 = () => {
    setIsWelcome(!IsWelcome)
    setIsLogin(!IsLogin)
  }
  const handleClick2 = () => {
    setIsWelcome(!IsWelcome)
    setIsSignUp(!IsSignUp)
  }

  if (IsWelcome) {
    return (
      <div>
        <Welcome handleClick1={handleClick1} handleClick2={handleClick2}/>
      </div>
    )
  }

  if (IsLogin) {

    return (
      <div className="login">
        <Login handlclick={handleClick1}/>
      </div>
    )
  }

  if (IsSignUp) {
    return (
      <div className="login">
        <SignUp handlclick={handleClick2}/>
      </div>
    )
  }

}

export default App;
