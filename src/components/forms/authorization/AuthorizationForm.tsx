import { Formik, Form, Field } from "formik";
import { validationLogin } from "../validation";
import "../formsDefaultStyles.scss";

type FormData = {
  email: string;
  password: string;
};

export const AuthorizationForm = () => {
  const initValues: FormData = {
    email: "",
    password: "",
  };

  return (
    <article className="authorization">
      <Formik
        initialValues={initValues}
        validationSchema={validationLogin}
        onSubmit={(values) => {
          console.log("authorization: ", values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <h2>Войти</h2>
            {errors.email && touched.email ? (
              <div className="error">{errors.email}</div>
            ) : null}
            <Field placeholder="Введите email" name="email" />
            {errors.password && touched.password ? (
              <div className="error">{errors.password}</div>
            ) : null}
            <Field
              placeholder="Введите пароль"
              type="password"
              name="password"
            />
            <button className="submitBtn" type="submit">
              Войти
            </button>
          </Form>
        )}
      </Formik>
    </article>
  );
};
