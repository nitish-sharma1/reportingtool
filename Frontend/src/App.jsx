import { useState } from 'react'
import './App.css'
import ReportForm from './components/ReportForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <ReportForm></ReportForm>
    </>
  )
}

export default App
