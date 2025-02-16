import LikeButton from "./LikeButton";
import SaveButton from "./SaveButton";
import { FaRegCommentDots } from "react-icons/fa6";
import { FaShare } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import moment from "moment";

const PostCard = ({
  id,
  content,
  commentsCount,
  likes,
  user,
  createdAt,
  image,
}) => {
  return (
    <article
      className={`mx-auto h-auto w-full max-w-[800px] min-w-[400px] overflow-hidden rounded-lg bg-white/85 shadow-lg`}
    >
      <header className="-b flex items-center justify-between px-4 py-3 shadow-sm">
        <div className="flex items-center gap-4">
          {/* User Pic */}
          <FaUser size={24} />

          {/* User Info */}
          <div role="button" onClick={() => console.log("User Profile")}>
            <div className="flex items-center gap-1">
              <h3 className="text-sm font-semibold">{user.username}</h3>
            </div>
            <p className="text-xs font-light">{moment(createdAt).fromNow()}</p>
          </div>
        </div>
        {/* Actions */}
        <SaveButton isSaved={false} onClick={() => console.log("Saved")} />
      </header>

      {/* Post Content */}
      <main>
        <p className="border-b p-2 text-start text-sm font-light shadow-lg">
          {content}
        </p>
        <img
          src={image}
          alt="post"
          className="max-h-[400px] w-full bg-gray-200"
          style={{ objectFit: "contain" }}
        />
      </main>

      <footer className="flex gap-4 border-t p-4">
        {/* Like  */}
        <LikeButton
          isLiked={false}
          count={likes}
          onClick={() => console.log("Liked")}
        />
        {/* Comment */}
        <button
          type="button"
          className="flex items-center gap-2 bg-transparent shadow-none drop-shadow-lg focus:outline-none"
          onClick={() => console.log("Comment")}
        >
          <FaRegCommentDots size={24} />
          <span className="text-primary text-sm">{commentsCount}</span>
        </button>
        {/* Share */}
        <button
          type="button"
          className="flex items-center gap-2 bg-transparent shadow-none drop-shadow-lg focus:outline-none"
          onClick={() => console.log("Comment")}
        >
          <FaShare size={24} />
        </button>
        {/* More */}
        <button
          type="button"
          className="ml-auto bg-transparent shadow-none drop-shadow-lg focus:outline-none"
          onClick={() => console.log("Comment")}
        >
          <HiDotsVertical size={24} />
        </button>
      </footer>
    </article>
  );
};

export default PostCard;
