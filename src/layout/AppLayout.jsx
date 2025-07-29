const AppLayout = ({ children }) => {
  return (
    <>
      <div>Header</div>
        {children}
      <div>Footer</div>
    </>
  );
};

export default AppLayout;
