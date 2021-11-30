import { Formik, Form, Field } from "formik";
import { validationLogin } from "../validation";
import "../formsDefaultStyles.scss";
import {useAppDispatch, useAppSelector} from "app/hooks";
import {login} from "features/api/authApiSlice";
import Button from '@mui/material/Button';

type FormData = {
  email: string;
  password: string;
};

export const AuthorizationForm = () => {
  const dispatch = useAppDispatch();
  const {error, isError} = useAppSelector((state) => state.auth);
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
          const userData = Object.assign({}, values);
          dispatch(login(userData));
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <h2>Войти</h2>
            {isError && <p className="errorMsg">{error}</p>}
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
            <Button style={{backgroundColor: "rgba(64, 178, 89, 1)"}}
            variant="contained"
            type="submit">
            Войти
            </Button>
          </Form>
        )}
      </Formik>
    </article>
  );
};
