import { NavLink } from "react-router";

const SideMenu = () => {
  return (
    <>
      <div className="flex flex-col justify-between w-64 h-screen bg-gray-800 text-white p-4">
        <div className="space-y-2">
          <NavLink to="/admin/users-data">
            <h1 className="my-3 text-xl">Admin Name</h1>
          </NavLink>

          <NavLink
            className="block px-4 py-2 bg-gray-900 rounded-md w-full"
            to="/admin/users-data"
          >
            All Students
          </NavLink>
          <NavLink
            className="block px-4 py-2 bg-gray-900 rounded-md w-full"
            to="/admin/courses"
          >
            Courses
          </NavLink>
          <NavLink
            className="block px-4 py-2 bg-gray-900 rounded-md w-full"
            to="/admin/active-user"
          >
            Active Students
          </NavLink>
        </div>

        <NavLink
          className="px-4 py-2 bg-[#ed5a5d66] rounded-md hover:bg-gray-600 text-center"
          to="/home-page"
        >
          Return to Home Page
        </NavLink>
      </div>
    </>
  );
};

export default SideMenu;
