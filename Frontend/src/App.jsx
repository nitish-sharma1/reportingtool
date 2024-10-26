import { useState } from 'react'
import './App.css'
import LoginPage from './components/LoginPage'
import ConfigPage from './components/ConfigPage'


 

function App() {
  
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <LoginPage></LoginPage> */}
    <ConfigPage></ConfigPage>
    </>
  )
}

export default App
