import { useState } from 'react'
import './App.css'
import LoginPage from './components/LoginPage'
import ConfigPage from './components/ConfigPage'


 

function App() {
  
  const [count, setCount] = useState(0)
  const [isLoggedIn , setLogin] = useState(false)

  return (
    <>
    {isLoggedIn ? <ConfigPage></ConfigPage> : <LoginPage></LoginPage>}
    
    </>
  )
}

export default App
