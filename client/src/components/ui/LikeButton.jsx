import { FaRegHeart as Outline } from "react-icons/fa6";
import { FaHeart as Filled } from "react-icons/fa";

const LikeButton = ({ isLiked = false, onClick, count }) => {
  return (
    <button
      type="button"
      className="flex items-center gap-2 bg-transparent shadow-none drop-shadow-lg focus:outline-none"
      onClick={onClick}
    >
      {isLiked ? (
        <Filled className="text-red-500" size={24} />
      ) : (
        <Outline size={24} />
      )}
      <span className={`text-sm ${isLiked ? "text-red-500" : "text-primary"}`}>
        {count}
      </span>
    </button>
  );
};

export default LikeButton;
