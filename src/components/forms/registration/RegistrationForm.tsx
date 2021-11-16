import { Formik, Form, Field } from "formik";
import {validationRegistration} from "../validation";
import "../formsDefaultStyles.scss";


interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export const RegistrationForm = () => {
  const initValues: FormValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  return (
    <article className="registration">
      <Formik
        initialValues={initValues}
        validationSchema={validationRegistration}
        onSubmit={(values) => {
          console.log("submit", values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <h2>Регистрация</h2>
            {errors.username && touched.username ? (
              <div className="error">{errors.username}</div>
            ) : null}
            <Field placeholder="Введите имя" name="username" />
            {errors.email && touched.email ? (
              <div className="error">{errors.email}</div>
            ) : null}
            <Field placeholder="Введите email" name="email" />
            {errors.password && touched.password ? (
              <div className="error">{errors.password}</div>
            ) : null}
            <Field
              type="password"
              placeholder="Введите пароль"
              name="password"
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <div className="error">{errors.confirmPassword}</div>
            ) : null}
            <Field
              type="password"
              placeholder="Подтвердите пароль"
              name="confirmPassword"
            />
            <button className="submitBtn" type="submit">
              Зарегистрироваться
            </button>
          </Form>
        )}
      </Formik>
    </article>
  );
};
