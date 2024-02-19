import * as yup from "yup";

export const basicSchema = yup.object().shape({
  name: yup.string().min(5).required("Required"),
  department: yup.string().required("Required"),
  employee: yup.string().required("Required"),
  description: yup.string().required("Required"),
  startdateTime: yup.date().required("Required"),
  enddateTime: yup.date().required("Required"),
  links: yup.string().required("Required"),
});
