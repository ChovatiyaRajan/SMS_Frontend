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

export const removeCourse = (removeID) =>
  API.delete(`/course/remove-course/${removeID}`);

export const updateCourse = (payload) =>
  API.put("/course/update-course", payload);

export const getCourseById = (id) => API.get(`/course/get-course/${id}`);

export const updateUserCourseId = (userID, courseID) =>
  API.put(`/students/course-enroll/${userID}`, { courseId: courseID });

export const endUserCourse = () => API.put("/students/course-end");

export const getActiveUsers = (params) =>
  API.get(`/students/acive-users?${params.toString()}`);

// LESSONS API
export const addLesson = (data) => API.post("/lessons/add-lesson", data);

export const getLessonsByCourse = (courseId) =>
  API.get(`/lessons/get-lessons/${courseId}`);

export const removeLesson = (lessonId) =>
  API.delete(`/lessons/del-lessons/${lessonId}`);
