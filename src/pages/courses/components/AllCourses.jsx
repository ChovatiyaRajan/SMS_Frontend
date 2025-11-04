import { useEffect, useState } from "react";
import { getCourses } from "../../../api/api";
import AppLayout from "../../../layout/AppLayout";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getCourses();
      setCourses(response.data.getCourses || []);
    } catch (error) {
      console.log("Error fetching courses:", error);
    }
  };

  return (
    <AppLayout>
      <div className="p-6" >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Available Courses
        </h2>

        {courses.length === 0 ? (
          <div className="text-gray-500 text-center">No courses available</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" >
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-2xl p-5 border hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-blue-600 mb-2">
                  {course.courseName}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {course.courseDescription}
                </p>

                <div className="space-y-1 text-sm text-gray-700">
                  <p>
                    <span className="font-semibold">Course Code:</span>{" "}
                    {course.courseCode}
                  </p>
                  <p>
                    <span className="font-semibold">Fee:</span> ₹
                    {course.courseFee}
                  </p>
                  <p>
                    <span className="font-semibold">Start Timeline:</span>{" "}
                    {course.courseTimeline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default AllCourses;
