import { Link } from "@tanstack/react-router";
import { formOptions, useForm } from "@tanstack/react-form";
import { motion } from "motion/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { registerAccount } from "../../lib/axios/auth";
import { useToasts } from "../../lib/Provider/ToastsContext";
import { useState, useRef } from "react";
import { getCountryList } from "../../lib/axios/country";

function Register() {
  // get app name
  const APP_NAME = import.meta.env.VITE_APP_NAME;

  // fetching country data

  const { data } = useQuery({
    queryKey: ["country"],
    queryFn: getCountryList,
  });


  // using toasts
  const { setToasts, toasts } = useToasts();
  // mutating for account creation
  const { mutate, isPending } = useMutation({
    mutationFn: (values) => {
      return registerAccount(values);
    },
    onSettled: (data) => {
      console.log(data);
      setToasts({
        open: true,
        data: { type: data.type, message: data.message },
      });
      form.reset()
    },
    onError: (error) => {
      console.log(error)
      setToasts({
        open: true,
        data: { type:error.type, message: error.message },
      });
    },
  });

  const formOpts = formOptions({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      contact: "",
      country: "Nepal",
      province: "Gandaki",
      gender:"",
      profilePic:"",
      dob:""
    },
  });

  const form = useForm({
    ...formOpts,
    onSubmit: ({ value }) => {
      if(value.gender=="Male"){
        value.profilePic="male.avif"
      }
      value.profilePic="female.png"
      // console.log(value)
      mutate(value);
    },
  });

  const countrySelectRef = useRef({ img: '' });

  const [isSelectOpen, setSelect] = useState(false);
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ scale: 1, opacity: 1, transition: { duration: 0.2 } }}
    >
      <div
        className={`mt-5 flex justify-center items-center ${toasts.open ? "overflow-hidden" : null
          }`}
      >
        <div className="bg-blue-50 p-5 flex min-w-[350px] gap-3 flex-col justify-center items-center border-[#dfdada] rounded-md ">
          {/* form link heading starts here  */}
          <Link to="/">
            <h1 className=" text-5xl pb-6">{APP_NAME}</h1>
          </Link>
          {/* form link heading ends here  */}
          {/* ---------------------------------------------------------------------------------------------------------------------------------  */}
          {/* Forms starts here  */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              void form.handleSubmit(e);
            }}
          >
            {/* firstname and lastname section starts here  */}
            <div className="flex gap-3">
              {/* firstname section starts here  */}
              <form.Field
                name="firstname"
                validators={{
                  onChange: ({ value }) => {
                    if (value.length < 3) {
                      return "Minimum 3 characters is required.";
                    }
                    return undefined;
                  },
                  onBlur: ({ value }) => {
                    console.log("Blur firstname", value);
                  },
                }}
              >
                {(field) => (
                  <div className="flex flex-col focus:border-blue-600">
                    <label
                      htmlFor={field.name}
                      className={`${field.state.meta.errors.length > 0 &&
                        field.state.meta.isTouched
                        ? "text-red-600"
                        : "text-black"
                        }`}
                    >
                      FirstName
                    </label>
                    <div
                      className={`border-[1.1px] w-[300px] rounded-md p-2 ${field.state.meta.errors.length > 0 &&
                        field.state.meta.isTouched
                        ? "border-red-600"
                        : "border-[#dfdada]"
                        }`}
                    >
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        className={`outline-0 p-0.5 w-full`}
                        type="text"
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={() => field.handleBlur()}
                      />
                    </div>
                    {field.state.meta.errors && field.state.meta.isTouched ? (
                      <em role="alert" className="text-red-600">
                        {field.state.meta.errors.join(",")}
                      </em>
                    ) : null}
                  </div>
                )}
              </form.Field>
              {/* firstname section ends here  */}
              {/* -------------------------------------------------------------------------------------------------------------------------------------  */}
              {/* lastname section ends here  */}
              <form.Field
                name="lastname"
                validators={{
                  onChange: ({ value }) => {
                    if (value.length < 3) {
                      return "Minimum 3 characters is required.";
                    }
                    return undefined;
                  },
                  onBlur: ({ value }) => {
                    console.log("Blur Lastname", value);
                  },
                }}
              >
                {(field) => (
                  <div className="flex flex-col">
                    <label
                      htmlFor={field.name}
                      className={`${field.state.meta.errors.length > 0 &&
                        field.state.meta.isTouched
                        ? "text-red-600"
                        : "text-black"
                        }`}
                    >
                      LastName
                    </label>
                    <div
                      className={`border-[1.1px] w-[300px] rounded-md p-2 ${field.state.meta.errors.length > 0 &&
                        field.state.meta.isTouched
                        ? "border-red-600"
                        : "border-[#dfdada]"
                        }`}
                    >
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        className="outline-0 p-0.5 w-full"
                        type="text"
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={() => field.handleBlur()}
                      />
                    </div>
                    {field.state.meta.errors && field.state.meta.isTouched ? (
                      <em role="alert" className="text-red-600">
                        {field.state.meta.errors.join(",")}
                      </em>
                    ) : null}
                  </div>
                )}
              </form.Field>

              {/* Lastname section ends here  */}
            </div>
            {/* Firstname and Lastname Section Ends Here  */}
            {/* ----------------------------------------------------------------------------------------------------------------------------------  */}
            {/* Email and Phone Number Section Starts Here  */}
            <div className="flex gap-3">
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
                  onBlur: ({ value }) => {
                    console.log("Blur email", value);
                  },
                }}
              >
                {(field) => {
                  return (
                    <div className="w-full">
                      <label
                        htmlFor={field.name}
                        className={`${field.state.meta.errors.length > 0 &&
                          field.state.meta.isTouched
                          ? "text-red-600"
                          : "text-black"
                          }`}
                      >
                        Email
                      </label>
                      <div
                        className={`border-[1.1px] w-[300px] rounded-md p-2 ${field.state.meta.errors.length > 0 &&
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
              {/* -------------------------------------------------------------------------------------------------------  */}
              {/* Phone Number Section Starts Here  */}
              <form.Field
                name="contact"
                validators={{
                  onChange: ({ value }) => {
                    if (value.length < 3) {
                      return "Minimum 3 characters is required.";
                    }
                    return undefined;
                  },
                  onBlur: ({ value }) => {
                    console.log("Blur Number", value);
                  },
                }}
              >
                {(field) => {
                  return (
                    <div className="w-full">
                      <label
                        htmlFor={field.name}
                        className={`${field.state.meta.errors.length > 0 &&
                          field.state.meta.isTouched
                          ? "text-red-600"
                          : "text-black"
                          }`}
                      >
                        Phone Number
                      </label>
                      <div
                        className={`border-[1.1px] w-[300px] rounded-md p-2 ${field.state.meta.errors.length > 0 &&
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
                          type="text"
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
              {/* Phone Number Section ends here  */}
            </div>
            {/* Email and Phone Number Field ends here  */}
            {/* ------------------------------------------------------------------------------------------------------------------------------------  */}
            {/* Country and Province Field Starts Here  */}
            <div className="flex gap-3">
              {/* Country field starts Here  */}
              <form.Field
                name="country"
                validators={{
                  onChange: ({ value }) => {
                    console.log(value)
                  },
                  onBlur: () => {
                    setSelect(false)
                  },
                }}
              >
                {(field) => {
                  return (
                    <div className="w-full">
                      <label
                        htmlFor={field.name}
                        className={`${field.state.meta.errors.length > 0 &&
                          field.state.meta.isTouched
                          ? "text-red-600"
                          : "text-black"
                          }`}
                      >
                        Country
                      </label>
                      <div
                        className={`border-[1.1px] w-[300px] rounded-md ${field.state.meta.errors.length > 0 &&
                          field.state.meta.isTouched
                          ? "border-red-600"
                          : "border-[#dfdada]"
                          }`}
                      >
                        <select
                          hidden
                          name={field.name}
                          id={field.name}
                          value={form.getFieldValue('country') || "Nepal"}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={() => field.handleBlur()}
                          className="outline-0 p-0.5 w-full"
                        >
                          {data != undefined &&
                            Array.from(data).map((value: any, item: number) => {
                              return (
                                <>
                                  <option
                                    value={value.name.common}
                                    data-img-src={value.flags.png}
                                    key={item}
                                  >
                                    {value.name.common}
                                  </option>
                                </>
                              );
                            })}
                        </select>
                        <div className="flex gap-3 w-full relative cursor-pointer" onClick={() => { setSelect((prevState) => !prevState); }}>
                          <img src={countrySelectRef.current.img || "https://flagcdn.com/w320/np.png"} className="w-[40px] h-[20px] rounded-sm mx-3 my-2" />
                          <div className="my-2">
                            {form.getFieldValue('country')}
                          </div>
                          {/* <motion.div > */}
                          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className={`absolute p-2 h-48 overflow-y-scroll bg-white rounded-md shadow-2xl shadow-gray-700 gap-2 z-10 top-9 ${isSelectOpen ? null : 'hidden'}`}>
                            {Array.from(data).map((value: unknown, item: number) => {
                              return (
                                <li onClick={(e) => {
                                  console.log(e)
                                  form.setFieldValue('country', e.target?.children[1].innerText)
                                  countrySelectRef.current.img = value?.flags.png
                                }} className="flex gap-3 my-2 hover:bg-blue-800 hover:text-white p-1 rounded-lg cursor-pointer" key={item}><img src={value?.flags?.png} className="w-[40px] h-[30px] rounded-sm" /><span>{value?.name?.common}</span></li>
                              )
                            })}
                          </motion.ul>
                          {/* </motion.div> */}
                        </div>
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
              {/* Country Field Ends Here  */}
              {/* -------------------------------------------------------------------------------------------------- */}
              {/* Province Section Starts Here  */}
              <form.Field
                name="province"
                validators={{
                  // onChange: ({ value }) => {
                  // if (value.length==0) {
                  //   return "Minimum 3 characters is required.";
                  // }
                  // return undefined;
                  // },
                  // onBlur: ({ value }) => {
                  //   console.log("Blur province", value);
                  // },
                }}
              >
                {(field) => {
                  return (
                    <div className="w-full">
                      <label
                        htmlFor={field.name}
                        className={`${field.state.meta.errors.length > 0 &&
                          field.state.meta.isTouched
                          ? "text-red-600"
                          : "text-black"
                          }`}
                      >
                        Province
                      </label>
                      <div
                        className={`border-[1.1px] w-[300px] rounded-md p-2 ${field.state.meta.errors.length > 0 &&
                          field.state.meta.isTouched
                          ? "border-red-600"
                          : "border-[#dfdada]"
                          }`}
                      >
                        <select
                          hidden
                          name={field.name}
                          id={field.name}
                          value="Gandaki"
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={() => field.handleBlur()}
                          className="outline-0 p-0.5 w-full"
                        >
                          {data != undefined &&
                            Array.from(data).map((value: any, item: number) => {
                              return (
                                <>
                                  <option
                                    value={value.name.common}
                                    data-img-src={value.flags.png}
                                    key={item}
                                  >
                                    {value.name.common}
                                  </option>
                                </>
                              );
                            })}
                        </select>
                        Gandaki
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
              {/* Provice Section Ends Here  */}
            </div>
            {/* Country and Province Field Ends Here  */}
            {/* ---------------------------------------------------------------------------------------------------------------------------------  */}

                <div className="flex gap-3">
            {/* Gender Starts Here */}
            <form.Field
              name="gender"
              validators={{
                onChange: ({ value }) => {
                  if (!value) {
                    return "Please select a gender.";
                  }
                  return undefined;
                },
              }}
            >
              {(field) => {
                return (
                  <div className="w-full">
                    <label
                      htmlFor={field.name}
                      className={`${
                        field.state.meta.errors.length > 0 && field.state.meta.isTouched
                          ? "text-red-600"
                          : "text-black"
                      }`}
                    >
                      Gender
                    </label>
                    <div
                      className={`border-[1.1px] w-[300px] rounded-md p-2 ${
                        field.state.meta.errors.length > 0 && field.state.meta.isTouched
                          ? "border-red-600"
                          : "border-[#dfdada]"
                      }`}
                    >
                      <div className="flex gap-3">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={field.name}
                            value="Male"
                            checked={field.state.value === "Male"}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={() => field.handleBlur()}
                          />
                          Male
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={field.name}
                            value="Female"
                            checked={field.state.value === "Female"}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={() => field.handleBlur()}
                          />
                          Female
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={field.name}
                            value="Other"
                            checked={field.state.value === "Other"}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={() => field.handleBlur()}
                          />
                          Other
                        </label>
                      </div>
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
            {/* Gender Ends Here */}
            {/* DOB Section Starts Here  */}
            <form.Field
              name="dob"
            >
              {(field) => {
                return (
                  <div className="w-full">
                    <label
                      htmlFor={field.name}
                      className={`${
                        field.state.meta.errors.length > 0 && field.state.meta.isTouched
                          ? "text-red-600"
                          : "text-black"
                      }`}
                    >
                      Date of Birth
                    </label>
                    <div
                      className={`border-[1.1px] w-[300px] rounded-md p-2 ${
                        field.state.meta.errors.length > 0 && field.state.meta.isTouched
                          ? "border-red-600"
                          : "border-[#dfdada]"
                      }`}
                    >
                      <div className="flex gap-3">
                        <label className="flex items-center gap-2">
                          <input 
                          name={field.name}
                          id={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={() => field.handleBlur()}
                          className="outline-0 p-0.5 w-full"
                          type="date"/>
                        </label>
                      </div>
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
            {/* DOB Section Ends Here  */}
            </div>

            {/* Password Field Starts  */}
            <div className="flex gap-3">
              <form.Field
                name="password"
                validators={{
                  onChange: ({ value }) => {
                    if (value.length < 3) {
                      return "Minimum 3 characters is required.";
                    }
                    return undefined;
                  },
                  onBlur: ({ value }) => {
                    console.log("Blur email", value);
                  },
                }}
              >
                {(field) => {
                  return (
                    <div className="w-full">
                      <label
                        htmlFor={field.name}
                        className={`${field.state.meta.errors.length > 0 &&
                          field.state.meta.isTouched
                          ? "text-red-600"
                          : "text-black"
                          }`}
                      >
                        Password
                      </label>
                      <div
                        className={`border-[1.1px] w-[300px] rounded-md p-2 ${field.state.meta.errors.length > 0 &&
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
              {/* Confirm Password Field Starts Here  */}
              <form.Field
                name="confirmPassword"
                validators={{
                  onChangeListenTo: ["password"],
                  onChange: ({ value, fieldApi }) => {
                    if (value !== fieldApi.form.getFieldValue("password")) {
                      return "Passwords do not match";
                    }
                    return undefined;
                  },
                }}
              >
                {(field) => {
                  return (
                    <div className="w-full">
                      <label
                        htmlFor={field.name}
                        className={`${field.state.meta.errors.length > 0 &&
                          field.state.meta.isTouched
                          ? "text-red-600"
                          : null
                          } transition-all`}
                      >
                        Confirm Password
                      </label>
                      <div
                        className={`flex justify-between items-center border-[1.1px] w-[300px] transition-all ${field.state.meta.errors.length > 0 &&
                          field.state.meta.isTouched
                          ? "border-red-600"
                          : "border-[#dfdada]"
                          } rounded-md p-2 w-full`}
                      >
                        <input
                          name={field.name}
                          id={field.name}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={() => field.handleBlur()}
                          value={field.state.value}
                          className="outline-0 p-0.5 w-full"
                          type="password"
                        />

                        {field.state.meta.errors.length > 0 &&
                          field.state.meta.isTouched ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="red"
                            className="size-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.339 2.237a.531.531 0 0 0-.678 0 11.947 11.947 0 0 1-7.078 2.75.5.5 0 0 0-.479.425A12.11 12.11 0 0 0 2 7c0 5.163 3.26 9.564 7.834 11.257a.48.48 0 0 0 .332 0C14.74 16.564 18 12.163 18 7c0-.538-.035-1.069-.104-1.589a.5.5 0 0 0-.48-.425 11.947 11.947 0 0 1-7.077-2.75ZM10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : null}
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
              {/* Confirm Password Field Ends Here */}
            </div>
            {/* Password Field ends here  */}
            {/* ----------------------------------------------------------------------------------------------------------------------------------------  */}
            {/* Submit Button Field Ends Here  */}
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit]) => {
                return (
                  <input
                    className={`mt-3 border-[1.1px] w-[300px] hover:bg-blue-600 transition-colors text-white border-[#dfdada] ${isPending
                      ? "hover:scale-100 bg-blue-200"
                      : "hover:scale-95 bg-blue-800"
                      } transition-transform text-xl rounded-md p-2 text-center w-full`}
                    value={isPending ? "Registering..." : "Register"}
                    type="submit"
                    disabled={!canSubmit || isPending}
                  />
                );
              }}
            />
          </form>
          <p>
            Already have a account?{" "}
            <Link
            to="/login"
              className="text-blue-500 hover:underline cursor-pointer"
            >
              {" "}
              Login
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Register;
