import * as yup from "yup";

export const schemaSignup = yup.object().shape({
  name: yup.string().required("Please provide name"),
  username: yup.string().required("Please provide username"),
  email: yup.string().email().required("Please provide email"),
  password: yup.string().min(8, "Too short").required(),
});

export const schemaLogin = yup.object().shape({
  email: yup.string().email().required("Please provide email"),
  password: yup.string().min(8, "Too short").required(),
});
