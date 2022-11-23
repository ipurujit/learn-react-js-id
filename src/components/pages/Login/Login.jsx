import React from 'react';
import BaseForm from '../../BaseForm/BaseForm';

import { loginFormInputFields } from './LoginFormConsts';

function Login() {
  return (
    <BaseForm
      inputFields={loginFormInputFields}
      formType="login"
      redirect="/welcome"
    />
  );
}

export default Login;
