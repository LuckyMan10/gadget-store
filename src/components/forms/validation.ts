import * as Yup from "yup";

const validationRegistration = Yup.object().shape({
  username: Yup.string().required("Обязательно").min(4, "Не менее 4 символов."),
  email: Yup.string()
    .required("Обязательно")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      "неверная форма email"
    ),
  password: Yup.string()
    .required("Обязательно")
    .min(8, "Минимум 6 символов")
    .max(20, "Максимум 20 символов")
    .matches(
      /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g,
      "Пароль должен содержать минимум 8 символов, 1 верхний регистр, 1 нижний, 1 число и 1 спец-символ"
    ),
  confirmPassword: Yup.string()
    .required("Обязательно")
    .oneOf([Yup.ref("password")], "Пароли должны совпадать"),
});

const validationLogin = Yup.object().shape({
  email: Yup.string()
    .required("Обязательно")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Неверный формат почты"),
  password: Yup.string().required("Обязательно"),
});

export {
  validationRegistration,
  validationLogin
}