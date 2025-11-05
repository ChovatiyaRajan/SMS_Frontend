import { useContext } from "react";
import AppLayout from "../../../layout/AppLayout";
import { AuthContext } from "../../../context/AuthContext";
import { endUserCourse, getUser, updateUserCourseId } from "../../../api/api";
import { Link } from "react-router";

const MyCourse = () => {
  const { auth, dispatch } = useContext(AuthContext);
  const user = auth?.user;

  const course = {
    courseId: user?.courseId,
    courseName: user?.courseId?.courseName,
    courseDescription: user?.courseId?.courseDescription,
    courseCode: user?.courseId?.courseCode,
    courseFee: user?.courseId?.courseFee,
    courseTimeline: user?.courseTimeline,
  };

  console.log(course);
  const endLearning = async () => {
    const confirmEndCoures = window.confirm(
      "Are you sure you want to End Course?"
    );
    if (confirmEndCoures)
      try {
        const courseID = "";
        console.log(auth.user._id, "Userid", courseID, "curserID");
        await endUserCourse();

        const response = await getUser();
        dispatch({ type: "SET_USER", payload: response.data.user });
        console.log("userID", response, "courseID", courseID);
      } catch (error) {
        console.log(error.message);
      }
  };
  return (
    <AppLayout>
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-6">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
          <div className="bg-blue-600 text-white py-6 px-8">
            <h1 className="text-3xl font-bold">📘 My Current Course</h1>
            <p className="text-blue-100 mt-1 text-sm">
              Welcome back, <span className="font-semibold">{user?.name}</span>!
            </p>
          </div>

          <div className="p-8">
            {course?.courseName ? (
              <>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {course?.courseName}
                  </h2>
                  <p className="text-sm text-gray-500 mt-2 md:mt-0">
                    Course Code:{" "}
                    <span className="font-medium">{course?.courseCode}</span>
                  </p>
                </div>

                <p className="text-gray-600 text-base mb-6 leading-relaxed">
                  {course?.courseDescription ||
                    "No course description available."}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl border p-4 text-center shadow-sm hover:shadow-md transition">
                    <p className="text-sm text-gray-500">⏳ Duration</p>
                    <h3 className="text-lg font-semibold text-gray-800 mt-1">
                      {course?.courseTimeline}
                    </h3>
                  </div>
                  <div className="bg-gray-50 rounded-xl border p-4 text-center shadow-sm hover:shadow-md transition">
                    <p className="text-sm text-gray-500">💰 Fee</p>
                    <h3 className="text-lg font-semibold text-gray-800 mt-1">
                      ₹{course?.courseFee}
                    </h3>
                  </div>
                </div>

                <div className="mt-10 text-center flex gap-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition">
                    Continue Learning →
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition"
                    onClick={endLearning}
                  >
                    End Learning →
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500 py-16">
                <h2 className="text-2xl font-semibold mb-3">
                  You haven’t started a course yet.
                </h2>
                <p>
                  Go to{" "}
                  <Link to="/find-courses">
                    <span className="text-blue-600 font-medium cursor-pointer hover:underline">
                      Find Courses
                    </span>{" "}
                  </Link>
                  and start your learning journey today!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default MyCourse;
