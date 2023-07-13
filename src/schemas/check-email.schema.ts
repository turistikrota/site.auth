import * as Yup from "yup";

export const createCheckEmailSchema = (t: any) =>
  Yup.object().shape({
    email: Yup.string()
      .email(t("validation.invalidEmail"))
      .required(t("validation.required")),
  });