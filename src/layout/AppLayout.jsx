import Header from "../Components/Header";

const AppLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default AppLayout;
