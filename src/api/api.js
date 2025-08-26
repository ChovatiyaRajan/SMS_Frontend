import API from "./axxios";

export const LoginUser = (payload) => API.post("/students/login", payload);

export const RegisterUser = (payload) =>
  API.post("/students/register", payload);

export const getUser = () => API.get("/students/get-user");

export const getUsers = (params) =>
  API.get(`/students/get-users?${params.toString()}`);

export const deleteUser = (id) => API.delete(`/students/del-user/${id}`);

export const updateUser = (id, updatedData) =>
  API.put(`/students/update-user/${id}`, updatedData);

export const addCourse = (payload) => API.post("/course/add-course", payload);

export const getCourses = (payload) => API.get("/course/get-courses", payload);
