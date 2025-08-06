import SideMenu from "../Components/SideMenu";

const SideBarLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Fixed Sidebar */}
      <div className="fixed top-0 left-0 h-screen w-64 bg-gray-100 border-r">
        <SideMenu />
      </div>

      {/* Main Content with margin to avoid overlap */}
      <div className="ml-64 w-full p-4">
        {children}
      </div>
    </div>
  );
};

export default SideBarLayout;
