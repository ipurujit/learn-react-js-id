export const getDefaultFormDataFromInputFieldConfig = (inputFieldConfig, defaultValue) => {
  console.log('Executing this again');
  if (!Array.isArray(inputFieldConfig)) {
    return {};
  }
  const initFormData = {};
  inputFieldConfig.forEach((fieldConfig) => { initFormData[fieldConfig?.name] = defaultValue; });
  return initFormData;
};

export const getData = () => {};
