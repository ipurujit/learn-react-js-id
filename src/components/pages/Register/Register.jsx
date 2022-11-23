import React from 'react';
import BaseForm from '../../BaseForm/BaseForm';

import { registerFormInputFields } from './RegisterFormConsts';

function Register() {
  return (
    <BaseForm
      inputFields={registerFormInputFields}
      formType="register"
      redirect="/login"
    />
  );
}

export default Register;
