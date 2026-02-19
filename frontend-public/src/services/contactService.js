import API from './api';

export const sendContact = async (form) => {
  const res = await API.post('/contact', form);
  return res.data;
};
