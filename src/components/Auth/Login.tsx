import { Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useMutation } from "@tanstack/react-query";
import { loginAccount } from "../../lib/axios/auth";
import { formOptions, useForm } from "@tanstack/react-form";
import { useToasts } from "../../lib/Provider/ToastsContext";
import { useAuth } from "../../lib/Provider/AuthContext";

function Login() {
  // get app name
  const APP_NAME = import.meta.env.VITE_APP_NAME;
  // using toasts
  const { setToasts } = useToasts();

  const navigate = useNavigate();
  // get useAuth
  const { setUserAuth }: any = useAuth();
  // logging account
  const { mutate, isPending } = useMutation<
    void,
    unknown,
    { email: string; password: string }
  >({
    mutationFn: (values) => {
      return loginAccount(values);
    },
    onSuccess: (data): void => {
      console.log(data);
      // set user authentication
      setUserAuth({
        isAuthenticated: true,
        authToken: data?.token,
        user: data?.data,
      });

      // display toasts
      setToasts({
        open: true,
        data: { type: data?.type, message: data?.message },
      });

      // reset form
      form.reset();

      // navigate to home after login
      navigate({ to: "/home" });
    },
    onError: (error) => {
      setUserAuth({
        isAuthenticated: false,
        authToken: null,
        user: null,
      });

      // display toasts
      setToasts({
        open: true,
        data: { type: error?.type, message: error?.message },
      });
    },
  });

  const formOpts = formOptions({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const form = useForm({
    ...formOpts,
    onSubmit: ({ value }) => {
      mutate(value);
    },
  });

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ scale: 1, opacity: 1, transition: { duration: 0.2 } }}
    >
      <div className="bg-transparent mt-22 flex justify-center items-center">
        <div className="bg-blue-50 p-5 flex min-w-[350px] gap-3 flex-col justify-center items-center border-[#dfdada] rounded-md ">
          <Link to="/">
            <h1 className=" text-5xl pb-6">{APP_NAME}</h1>
          </Link>
          {/* ---------------------------------------------------------------------------------------------------------------------------------  */}
          {/* Forms starts here  */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              void form.handleSubmit(e);
            }}
          >
            {/* ----------------------------------------------------------------------------------------------------------------------------------  */}
            {/* Email Field Starts Here  */}

            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  if (value.length < 3) {
                    return "Minimum 3 characters is required.";
                  }
                  return undefined;
                },
                // onBlur: ({ value }) => {
                //   // console.log("Blur email", value);
                // },
              }}
            >
              {(field) => {
                return (
                  <div className="w-full">
                    <label
                      htmlFor={field.name}
                      className={`${
                        field.state.meta.errors.length > 0 &&
                        field.state.meta.isTouched
                          ? "text-red-600"
                          : "text-black"
                      }`}
                    >
                      Email
                    </label>
                    <div
                      className={`border-[1.1px] w-[300px] rounded-md p-2 ${
                        field.state.meta.errors.length > 0 &&
                        field.state.meta.isTouched
                          ? "border-red-600"
                          : "border-[#dfdada]"
                      }`}
                    >
                      <input
                        name={field.name}
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={() => field.handleBlur()}
                        className="outline-0 p-0.5 w-full"
                        type="email"
                      />
                    </div>
                    {field.state.meta.errors && field.state.meta.isTouched ? (
                      <em role="alert" className="text-red-600">
                        {field.state.meta.errors.join(",")}
                      </em>
                    ) : null}
                  </div>
                );
              }}
            </form.Field>
            {/* Email Section Ends Here  */}
            {/* ---------------------------------------------------------------------------------------------------------------------------------  */}
            {/* Password Field Starts  */}
            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) => {
                  if (value.length < 3) {
                    return "Minimum 3 characters is required.";
                  }
                  return undefined;
                },
                // onBlur: ({ value }) => {
                //   console.log("Blur email", value);
                // },
              }}
            >
              {(field) => {
                return (
                  <div className="w-full">
                    <label
                      htmlFor={field.name}
                      className={`${
                        field.state.meta.errors.length > 0 &&
                        field.state.meta.isTouched
                          ? "text-red-600"
                          : "text-black"
                      }`}
                    >
                      Password
                    </label>
                    <div
                      className={`border-[1.1px] w-[300px] rounded-md p-2 ${
                        field.state.meta.errors.length > 0 &&
                        field.state.meta.isTouched
                          ? "border-red-600"
                          : "border-[#dfdada]"
                      }`}
                    >
                      <input
                        name={field.name}
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={() => field.handleBlur()}
                        className="outline-0 p-0.5 w-full"
                        type="password"
                      />
                    </div>
                    {field.state.meta.errors ? (
                      <em role="alert" className="text-red-600">
                        {field.state.meta.errors.join(",")}
                      </em>
                    ) : null}
                  </div>
                );
              }}
            </form.Field>
            {/* Password Field Ends here */}
            {/* ---------------------------------------------------------------------------------------------------------------------------------------  */}
            {/* Submit Button Field Ends Here  */}
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => {
                return (
                  <input
                    className={`mt-3 border-[1.1px] w-[300px] hover:bg-blue-600 transition-colors text-white border-[#dfdada] ${
                      isPending
                        ? "hover:scale-100 bg-blue-200"
                        : "hover:scale-95 bg-blue-800"
                    } transition-transform text-xl rounded-md p-2 text-center w-full`}
                    value={isPending || isSubmitting ? "Login..." : "Login"}
                    type="submit"
                    disabled={!canSubmit || isPending}
                  />
                );
              }}
            />
          </form>
          <p>
            Don't have a account?{" "}
            <Link
            to="/register"
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Login;
