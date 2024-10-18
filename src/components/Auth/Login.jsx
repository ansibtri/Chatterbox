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
  Modal,
} from "@mui/material";
// import { useEffect } from "react";
import { useState } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as yup from "yup";
import { ErrorOutline } from "@mui/icons-material";
import ForgetPassword from "./ForgetPassword";
import PropTypes from "prop-types";

// validation schema for login forms
const loginValidationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Minimum 6 Characters").min(6),
});

const LoginForm = ({handleModalOpen}) => {
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
        spacing={3}
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
          <Typography variant="h2">Chatterbox</Typography>
          <Typography variant="h5">Login</Typography>
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
              required
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
          <Button
            variant="text"
            color="primary"
            onClick={handleModalOpen}
          >
            Forget Password?
          </Button>
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
            <Typography variant="body1">Login</Typography>
          </Button>
          <Divider>or</Divider>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link href="/signup" underline="none">
              Sign up
            </Link>
          </Typography>
        </Box>
      </Stack>
    </Form>
  );
};

LoginForm.propTypes= {
  handleModalOpen: PropTypes.func.isRequired
}

const Login = () => {
  
  // handling forget password modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          console.log(values);
        }}
      >
        {
          // formik props
          (props) => <LoginForm properties={props} modalOpen={open} handleModalOpen={handleOpen}/>
        }
      </Formik>
      <Modal 
      open={open} 
      onClose={handleClose}
      aria-labelledby="Password Recovery"
      aria-describedby="Recover your password"
      >
        <div><ForgetPassword /></div>
      </Modal>
    </>
  );
};

export default Login;
