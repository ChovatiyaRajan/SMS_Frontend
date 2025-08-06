import API from "./axxios";

export const LoginUser = (payload) => API.post("/students/login", payload);

export const RegisterUser = (payload) =>
  API.post("/students/register", payload);

export const getUser = () => API.get("/students/get-user");

export const getUsers = () => API.get("/students/get-users");

export const deleteUser = (id) => API.delete(`/students/del-user/${id}`);

export const updateUser = (id , updatedData) => API.put(`/students/update-user/${id}` , updatedData);
