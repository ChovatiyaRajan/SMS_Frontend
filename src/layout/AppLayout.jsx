import Header from "../Components/Header";

const AppLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <div>Footer</div>
    </>
  );
};

export default AppLayout;
