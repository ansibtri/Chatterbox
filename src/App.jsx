import {Routes,Route} from "react-router-dom"
import Login from "./components/Auth/Login"
import ForgetPassword from "./components/Auth/ForgetPassword"
// import Signup from "./components/Auth/Signup.jsx"
function App() {
    return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/forgetPassword" element={<ForgetPassword />} />
      </Routes>
    </>
  )
}

export default App
