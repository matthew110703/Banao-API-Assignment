import NavBar from "./NavBar";

const Container = ({ children }) => {
  return (
    <>
      <div className="container mx-auto px-2">
        <NavBar />
        {children}
      </div>
    </>
  );
};

export default Container;
