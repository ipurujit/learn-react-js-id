import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setUser } from '../../app/user-reducer';
import inputFieldData from '../config/content';
import { getDefaultFormDataFromInputFieldConfig } from '../utils/FormUtils';

function BaseForm(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { inputFields, formType, redirect } = props;
  // Loader for duration of API calls
  const [loading, setLoading] = useState(false);
  // Form data
  const [formData, setFormData] = useState({});
  // Form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    // Call API
    setLoading(true);

    let submitApi;
    switch (formType) {
      case 'login':
        submitApi = '/user/login';
        break;
      case 'register':
        submitApi = '/user/register';
        break;
      default:
        throw new Error('Unknown type');
    }
    console.log(formData);
    fetch((inputFieldData.getBaseURL() || '') + submitApi, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res);
        if (formType === 'login') {
          const authHeader = res.headers.get('Authorization');
          localStorage.setItem('token', authHeader);
        }
        return res.json();
      })
      .then((resData) => {
        if (formType === 'login') {
          console.log('dispatching');
          dispatch(setUser(resData.data));
        }
        console.log(resData);
        navigate(redirect);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const [fieldData, setFieldData] = useState({
    inputs: [],
  });
  const fetchData = async () => {
    const data = await inputFieldData.getData();
    setFieldData({ ...data, inputs: inputFields });
    setFormData(
      getDefaultFormDataFromInputFieldConfig(inputFields, ''),
    );
  };
  useEffect(() => {
    fetchData();
  }, []); // Default use effect - MUST NOT HAVE ANY WATCHERS

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {fieldData.inputs.map((inputField) => (
          <div key={inputField.key}>
            <label htmlFor={inputField.name}>{inputField.label}</label>
            <br />
            <input
              onChange={handleInputChange}
              value={formData[inputField.name]}
              id={inputField.id}
              name={inputField.name}
              required={inputField.required}
              placeholder={inputField.placeholder}
              pattern={inputField.pattern}
              type={inputField.type}
              disabled={loading}
            />
          </div>
        ))}

        <input
          type="submit"
          value={typeof formType === 'string'
            ? formType.slice(0, 1).toUpperCase()
            + formType.slice(1)
            : 'Submit'}
        />
      </form>
    </div>
  );
}

BaseForm.propTypes = {
  formType: PropTypes.string,
  redirect: PropTypes.string,
  inputFields: PropTypes.arrayOf(PropTypes.shape({})),
};

BaseForm.defaultProps = {
  formType: '',
  redirect: '',
  inputFields: [],
};

export default BaseForm;
