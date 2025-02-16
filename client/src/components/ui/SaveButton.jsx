import {
  FaRegBookmark as Outline,
  FaBookmark as Filled,
} from "react-icons/fa6";

const SaveButton = ({ isSaved = false, onClick }) => {
  return (
    <button
      type="button"
      className="bg-transparent shadow-none drop-shadow-lg focus:outline-none"
      onClick={onClick}
    >
      {isSaved ? <Filled size={24} /> : <Outline size={24} />}
    </button>
  );
};

export default SaveButton;
