import {Routes,Route} from "react-router-dom"
import Login from "./components/Auth/Login"
import Signup from "./components/Auth/Signup.jsx"
import MessagePage from "./components/MessagePage/MessagePage.jsx"

function App() {
    return (
    <>
    
      <Routes>

        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Signup/>}/>

        {/* if logged in the */}
        {/* <Route exact path="/" element={<MessagePage/>} /> */}
      </Routes>
    </>
  )
}

export default App
