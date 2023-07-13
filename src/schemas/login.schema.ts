import * as Yup from "yup";

export const createLoginSchema = (t: any) =>
  Yup.object().shape({
    email: Yup.string()
      .email(t("validation.invalidEmail"))
      .required(t("validation.required")),
    password: Yup.string()
      .min(
        6,
        t("validation.passwordMin", {
          min: 6,
        })
      )
      .required(t("validation.required")),
  });