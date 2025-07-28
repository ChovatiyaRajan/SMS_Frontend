import API from "./axxios";

export const LoginUser = (payload) => API.post('/students/login', payload);
export const RegisterUser = (payload) => API.post('/students/register', payload);