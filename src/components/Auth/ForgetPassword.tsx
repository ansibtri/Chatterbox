import { Link } from "@tanstack/react-router";
import { useRouteMasksAuth } from "../../hooks/useRouteMaskHooks";
import { motion } from "motion/react";

function Login() {
  const openAuth = useRouteMasksAuth();
  // get app name
  const APP_NAME = import.meta.env.VITE_APP_NAME;
  return (
    <motion.div initial={{scale:0.9,opacity:0}} exit={{ opacity: 0 }} animate={{scale:1,opacity:1, transition:{duration:.2}}}>
      <div className="bg-transparent mt-22 flex justify-center items-center">
        <div className="bg-blue-50 p-5 flex min-w-[350px] gap-3 flex-col justify-center items-center border-[#dfdada] rounded-md ">
          <Link to="/">
            <h1 className=" text-5xl pb-6">{APP_NAME}</h1>
          </Link>
          <label>
            Email
            <div className="border-[1.1px] w-[300px] border-[#dfdada] rounded-md p-2">
              <input className="outline-0 p-0.5" type="email" />
            </div>
          </label>
          <label>
            Password
            <div className="border-[1.1px] w-[300px] border-[#dfdada] rounded-md p-2">
              <input className="outline-0 p-0.5" type="password" />
            </div>
          </label>
          <div className="border-[1.1px] w-[300px] bg-blue-800 hover:bg-blue-600 transition-colors text-white border-[#dfdada] hover:scale-95 transition-transform text-xl rounded-md p-2 text-center">
            <input className="text-center " type="Submit" />
          </div>
          <p>
            Already have a account?{" "}
            <button
              onClick={() => {
                openAuth("register");
              }}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Login;
