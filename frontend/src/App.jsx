import {SignIn} from "./components/SignIn.jsx"
import Landing from "./components/Landing.jsx"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { SignUp } from "./components/SignUp.jsx"
import { Dashboard } from "./components/Dashboard.jsx"
import { Send } from "./components/Send.jsx"
function App() {

  return (
    <BrowserRouter>

   <Routes>

    <Route path="/signIn" element={<SignIn/>}/>
    <Route path="/" element={<Landing/>}/>
    <Route path="/signUp" element={<SignUp/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/send" element={<Send/>}/>
   </Routes>
    </BrowserRouter>
  )
}

export default App
