import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById, updateUserCourseId } from "../../../api/api"; // you'll create this
import AppLayout from "../../../layout/AppLayout";
import { AuthContext } from "../../../context/AuthContext";
import { getUser } from "./../../../api/api";

const CourseDetails = () => {
  const { auth, dispatch   } = useContext(AuthContext);
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await getCourseById(id);
      setCourse(response.data.course);
    } catch (error) {
      console.log("Error fetching course details:", error);
    }
  };

  if (!course) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-[80vh] text-gray-500">
          Loading course details...
        </div>
      </AppLayout>
    );
  }

  const enrollStudent = async () => {
    try {
      const courseID = course._id;
      await updateUserCourseId(auth.user._id, courseID);

      const response = await getUser();
      dispatch({ type: "SET_USER", payload: response.data.user });
      console.log("userID", response, "courseID", courseID);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-3xl mx-auto mt-5">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline mb-4"
        >
          ← Back to Courses
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-6 border">
          <h1 className="text-3xl font-bold text-blue-700 mb-3">
            {course.courseName}
          </h1>
          <p className="text-gray-700 mb-5">{course.courseDescription}</p>

          <div className="space-y-2 text-sm text-gray-800">
            <p>
              <span className="font-semibold">Course Code:</span>{" "}
              {course.courseCode}
            </p>
            <p>
              <span className="font-semibold">Fee:</span> ₹{course.courseFee}
            </p>
            <p>
              <span className="font-semibold">Timeline:</span>{" "}
              {course.courseTimeline}
            </p>
          </div>
          <div className="p-2 flex justify-end">
            <button
              className="py-2 px-10 bg-gray-700 hover:bg-gray-800 text-white rounded-md"
              onClick={enrollStudent}
            >
              Want To Learn This Course
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CourseDetails;
