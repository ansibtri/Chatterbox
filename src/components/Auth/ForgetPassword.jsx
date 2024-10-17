import { ErrorOutline, Email } from "@mui/icons-material";
import {
  Button,
  Box,
  OutlinedInput,
  Stack,
  FormControl,
  InputAdornment,
  Typography,
  InputLabel,
  CircularProgress,
} from "@mui/material";
// import { useEffect } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as yup from "yup";

// validation schema for login forms
const loginValidationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const ForgetPasswordForm = () => {
  // handling formik context
  const {
    isSubmitting,
    handleBlur,
    handleSubmit,
    handleChange,
    errors,
    touched,
  } = useFormikContext();

  return (
    <Form>
      <Box
        sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform:'translate(-50%,-50%)',
            width: "400",
            bgcolor: "background.paper",
            border: "2px solid #fff",
            boxShadow: 24,
            p: 5,
        }}
      >
        <Typography variant="h4" textAlign={'center'} gutterBottom>Chatterbox</Typography>
        <Typography variant="body1" textAlign={'center'} gutterBottom>Recover Password</Typography>
        <FormControl fullWidth variant="outlined">
          <InputLabel
            htmlFor="component-outlined-email"
            color={errors.email && touched.email ? "error" : "primary"}
            sx={{ marginBottom: "8px" }}
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
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          endIcon={
            isSubmitting ? <CircularProgress color="#fff" size={20} /> : null
          }
          disabled={isSubmitting}
          type="submit"
        >
          <Typography variant="body1">Validate Email</Typography>
        </Button>
      </Box>
    </Form>
  );
};

const ForgetPassword = () => {
  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
        }}
      >
        {
          // formik props
          (props) => <ForgetPasswordForm properties={props} />
        }
      </Formik>
    </>
  );
};

export default ForgetPassword;
