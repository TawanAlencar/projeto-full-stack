import * as yup from "yup";

export const contactsSerializer = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
});
