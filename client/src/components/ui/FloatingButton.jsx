import { MdAdd } from "react-icons/md";
const FloatingButton = ({ onClick }) => {
  return (
    <button
      className="bg-primary fixed right-4 bottom-4 rounded-full p-4 text-white shadow-lg md:hidden"
      onClick={onClick}
    >
      <MdAdd size={32} />
    </button>
  );
};

export default FloatingButton;
