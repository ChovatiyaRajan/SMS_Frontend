import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById } from "../../../api/api"; // you'll create this
import AppLayout from "../../../layout/AppLayout";

const CourseDetails = () => {
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
            <p>
              <span className="font-semibold">Starting Date:</span>{" "}
              {new Date(course.courseStartingDate).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Ending Date:</span>{" "}
              {new Date(course.courseEndingDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CourseDetails;
