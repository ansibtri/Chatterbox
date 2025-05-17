import { Link } from "@tanstack/react-router";
const Navbar = () => {

  // get app name 
  const APP_NAME = import.meta.env.VITE_APP_NAME;
  return (
    <div className="navbar py-4">
      <nav className="bg-white/50 font-chitchat-sans-headline w-[85%] rounded-4xl m-auto backdrop-blur-md px-5 py-2 bg-opacity-0 flex justify-between items-center">
      <Link to="/">
        {" "}
        <h6 className="text-xl tracking-widest p-2">{APP_NAME}</h6>
      </Link>
      <ul className="flex text-xl justify-around items-center w-80">
        <li className="hover:scale-105 transition-transform">
          <Link to="/products">Products</Link>
        </li>
        <li className="hover:scale-105 transition-transform">
          <Link to="/services">Services</Link>
        </li>
        <li className="hover:scale-105 transition-transform">
          <Link to="/downloads">Downloads</Link>
        </li>
      </ul>
      <div>
        <Link
        to="/login"
          className="bg-black text-xl px-5  font-chitchat-sans-bold py-2 text-center rounded-3xl text-white hover:bg-neutral-700"
        >
          Login
        </Link>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
