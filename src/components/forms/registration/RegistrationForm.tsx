import { Formik, Form, Field } from "formik";
import {validationRegistration} from "../validation";
import "../formsDefaultStyles.scss";
import {useAppDispatch} from "app/hooks";
import {registration} from "features/api/authApiSlice";
import Button from '@mui/material/Button';
import {setMenuVisible, setRegForm, setAuthModalVisible} from "features/appVisible/appVisibleSlice";
import React from 'react';
import {FormRegType} from "types";

const RegistrationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const initValues: FormRegType = {
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
          const userData = Object.assign({}, values);
          delete userData.confirmPassword;
          dispatch(registration(userData)).then(() => {
            dispatch(setMenuVisible(false));
            dispatch(setRegForm(false))
            dispatch(setAuthModalVisible(false));
            document.body.style.overflow = "scroll";
          })
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
            <Button style={{backgroundColor: "rgba(64, 178, 89, 1)"}}
            variant="contained"
            type="submit">
            Зарегистрироваться
            </Button>
          </Form>
        )}
      </Formik>
    </article>
  );
};

export {
  RegistrationForm
}