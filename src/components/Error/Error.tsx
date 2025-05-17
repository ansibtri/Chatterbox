import { Link } from "@tanstack/react-router";

const Error = ({ errorTitle = null, errorMessage = null, errorImg = null }) => {
  return (
    <div className="flex flex-col h-full justify-center items-center">
      {errorImg && <img src={errorImg && "error.gif"} />}
      <h1 className="text-center text-4xl">
        ERR_CODE: {errorTitle ? errorTitle : "Something Went Wrong"}
        <br/>
        
        {errorMessage ? errorMessage : null}
        <br/>
        <Link to="/" className="underline">Go to Home</Link>
      </h1>
    </div>
  );
};

export default Error;
