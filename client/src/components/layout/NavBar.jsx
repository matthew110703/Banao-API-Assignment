import { useRef } from "react";

// Icons
import { TiSocialInstagramCircular } from "react-icons/ti";
import { FaUserCircle } from "react-icons/fa";
import {
  FaRegHeart as OutlineHeart,
  FaHeart as FilledHeart,
  FaRegBookmark as OutlineBookmark,
  FaBookmark as FilledBookmark,
} from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import NavLink from "../ui/NavLink";

const NavBar = () => {
  const accountRef = useRef(null);
  return (
    <header className="container mx-auto flex items-center justify-between rounded-lg px-4 py-2 shadow-sm">
      <div className="flex items-center gap-2">
        <TiSocialInstagramCircular size={32} />
        <h1 className="text-lg font-bold">Social Hub</h1>
      </div>
      <nav className="flex items-center gap-4">
        <NavLink
          text={"Liked"}
          icon={<OutlineHeart />}
          iconActive={<FilledHeart />}
          className={"md:hidden"} // Hide on medium screens
        />
        <NavLink
          text={"Saved"}
          icon={<OutlineBookmark />}
          iconActive={<FilledBookmark />}
          className={"md:hidden"} // Hide on medium screens
        />

        {/* Account  */}
        <div className="relative">
          <button
            className="ring-primary rounded-full shadow-md hover:ring-1"
            ref={accountRef}
            onClick={() =>
              accountRef.current.nextElementSibling.classList.toggle("hidden")
            }
          >
            <FaUserCircle size={32} />
          </button>
          {/* Options  */}
          <div className="absolute top-12 right-0 z-[9999] hidden w-52 rounded-lg bg-white p-2 shadow-md transition-all transition-discrete">
            <NavLink
              text={"Account"}
              icon={<FaUserCircle />}
              disableResponsiveness
              to="/account"
            />
            <NavLink
              text={"Logout"}
              icon={<RiLogoutCircleLine />}
              disableResponsiveness
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
