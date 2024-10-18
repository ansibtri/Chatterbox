import {
  Visibility,
  VisibilityOff,
  LoginOutlined,
  Email,
} from "@mui/icons-material";
import {
  Button,
  Box,
  OutlinedInput,
  Stack,
  FormControl,
  InputAdornment,
  Typography,
  InputLabel,
  IconButton,
  Link,
  Divider,
  CircularProgress,
  Grid2,
} from "@mui/material";

// import { useEffect } from "react";
import { useState } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as yup from "yup";
import { ErrorOutline } from "@mui/icons-material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// validation schema for login forms
const SignupValidationSchema = yup.object({
  firstname: yup.string().required("First Name is required").min(3),
  lastname: yup.string().required("Last Name is required").min(3),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Minimum 6 Characters").min(6),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  phone: yup.string().required("Phone number is required").min(10),
  date: yup.date(),
});

const SignupForm = () => {
  // handling formik context
  const {
    isSubmitting,
    handleBlur,
    handleSubmit,
    handleChange,
    errors,
    touched,
  } = useFormikContext();

  // handling password visibility
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Form>
      <Stack
        spacing={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            minWidth: "300px",
            gap: "20px",
          }}
        >
          <Typography variant="h5">Signup</Typography>
          <Grid2
            container
            spacing={2}
            sx={{
              width: "100%",
              gap: "15px",
              marginBottom: "0",
            }}
          >
            <Grid2 xs={6} sx={{ width: "48.5%" }}>
              <FormControl fullWidth>
                <InputLabel htmlFor="component-outlined-firstname" required>
                  First Name
                </InputLabel>
                <OutlinedInput
                  id="component-outlined-firstname"
                  type="text"
                  name="firstname"
                  label="First Name"
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                  onBlur={handleBlur}
                  sx={{ marginBottom: "5px" }}
                />
                {errors.firstname && touched.firstname ? (
              <Stack direction="row" sx={{ margin: "5px" }}>
                <ErrorOutline color="error" sx={{ fontSize: "18px" }} />
                <Typography
                  color="error"
                  variant="body1"
                  sx={{ fontSize: "15px", marginLeft: "5px" }}
                >
                  {errors.firstname}
                </Typography>
              </Stack>
            ) : null}
              </FormControl>
            </Grid2>
            <Grid2 xs={6} sx={{ width: "48.5%" }}>
              <FormControl fullWidth>
                <InputLabel htmlFor="component-outlined-lastname" required>
                  Last Name
                </InputLabel>
                <OutlinedInput
                  id="component-outlined-lastname"
                  type="text"
                  name="lastname"
                  label="Last Name"
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                  onBlur={handleBlur}
                  sx={{ marginBottom: "5px" }}
                />
                {errors.lastname && touched.lastname ? (
              <Stack direction="row" sx={{ margin: "5px" }}>
                <ErrorOutline color="error" sx={{ fontSize: "18px" }} />
                <Typography
                  color="error"
                  variant="body1"
                  sx={{ fontSize: "15px", marginLeft: "5px" }}
                >
                  {errors.lastname}
                </Typography>
              </Stack>
            ) : null}
              </FormControl>
            </Grid2>
          </Grid2>
          <FormControl fullWidth variant="outlined">
            <InputLabel
              htmlFor="component-outlined-email"
              required
              color={errors.email && touched.email ? "error" : "primary"}
            >
              Email
            </InputLabel>
            <OutlinedInput
              id="component-outlined-email"
              type="email"
              name="email"
              error={errors.email && touched.email}
              endAdornment={
                <InputAdornment position="end">
                  <Email />
                </InputAdornment>
              }
              label="Email"
              onChange={handleChange}
              disabled={isSubmitting}
              required
              onBlur={handleBlur}
              sx={{ marginBottom: "5px" }}
            />
            {errors.email && touched.email ? (
              <Stack direction="row" sx={{ margin: "5px" }}>
                <ErrorOutline color="error" sx={{ fontSize: "18px" }} />
                <Typography
                  color="error"
                  variant="body1"
                  sx={{ fontSize: "15px", marginLeft: "5px" }}
                >
                  {errors.email}
                </Typography>
              </Stack>
            ) : null}
          </FormControl>

          <Grid2
            container
            spacing={2}
            sx={{
              width: "100%",
              gap: "15px",
              marginBottom: "0",
            }}
          >
            <Grid2 xs={6} sx={{ width: "48%" }}>
              <DatePicker />
              {errors.date && touched.date ? (
              <Stack direction="row" sx={{ margin: "5px" }}>
                <ErrorOutline color="error" sx={{ fontSize: "18px" }} />
                <Typography
                  color="error"
                  variant="body1"
                  sx={{ fontSize: "15px", marginLeft: "5px" }}
                >
                  {errors.date}
                </Typography>
              </Stack>
            ) : null}
            </Grid2>
            <Grid2 xs={6} sx={{ width: "49%" }}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="component-outlined-phone" required>
                  Phone Number
                </InputLabel>
                <OutlinedInput
                  id="component-outlined-phone"
                  type="text"
                  name="phone"
                  label="Phone Number"
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                  onBlur={handleBlur}
                  sx={{ marginBottom: "5px" }}
                  startAdornment={
                    <InputAdornment position="end">+977</InputAdornment>
                  }
                />
                {errors.phone && touched.phone ? (
              <Stack direction="row" sx={{ margin: "5px" }}>
                <ErrorOutline color="error" sx={{ fontSize: "18px" }} />
                <Typography
                  color="error"
                  variant="body1"
                  sx={{ fontSize: "15px", marginLeft: "5px" }}
                >
                  {errors.phone}
                </Typography>
              </Stack>
            ) : null}
              </FormControl>
            </Grid2>
          </Grid2>
          <Grid2
            container
            spacing={2}
            sx={{
              width: "100%",
              gap: "15px",
              marginBottom: "0",
            }}
          >
            <Grid2 xs={12} md={6} sx={{ width: "48.5%" }}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="component-outlined-password" required>
                  Password
                </InputLabel>
                <OutlinedInput
                  name="password"
                  id="component-outlined-password"
                  type={showPassword ? "text" : "password"}
                  error={errors.password && touched.password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  disabled={isSubmitting}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password ? (
                  <Stack direction="row" sx={{ margin: "5px" }}>
                    <ErrorOutline color="error" sx={{ fontSize: "18px" }} />
                    <Typography
                      color="error"
                      sx={{ fontSize: "15px", marginLeft: "5px" }}
                    >
                      {errors.password}
                    </Typography>
                  </Stack>
                ) : null}
              </FormControl>
            </Grid2>
            <Grid2 xs={12} md={6} sx={{ width: "48.5%" }}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel
                  htmlFor="component-outlined-confirm-password"
                  required
                >
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  name="confirmPassword"
                  id="component-outlined-confirm-password"
                  type={showPassword ? "text" : "password"}
                  error={errors.password && touched.password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                  disabled={isSubmitting}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password ? (
                  <Stack direction="row" sx={{ margin: "5px" }}>
                    <ErrorOutline color="error" sx={{ fontSize: "18px" }} />
                    <Typography
                      color="error"
                      sx={{ fontSize: "15px", marginLeft: "5px" }}
                    >
                      {errors.password}
                    </Typography>
                  </Stack>
                ) : null}
              </FormControl>
            </Grid2>
          </Grid2>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            endIcon={
              isSubmitting ? (
                <CircularProgress color="#fff" size={20} />
              ) : (
                <LoginOutlined />
              )
            }
            disabled={isSubmitting}
            type="submit"
          >
            <Typography variant="body1">Register</Typography>
          </Button>
          <Divider>or</Divider>
          <Typography variant="body2">
            Already have an account?{" "}
            <Link href="/" underline="none">
              Login
            </Link>
          </Typography>
        </Box>
      </Stack>
    </Form>
  );
};
const Signup = () => {
  return (
    <>
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          date: "",

        }}
        validationSchema={SignupValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          console.log(values);
        }}
      >
        {
          // formik props
          (props) => <SignupForm properties={props} />
        }
      </Formik>
    </>
  );
};

export default Signup;

// Remaining: Form Validation
