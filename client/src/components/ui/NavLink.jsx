import { Link } from "react-router-dom";

const NavLink = ({
  icon,
  iconActive,
  text,
  to = "#",
  onClick,
  className,
  active,
  hidden = false,
  disableResponsiveness = false,
}) => {
  return (
    <Link
      role="button"
      to={to}
      onClick={onClick}
      className={`hover:bg-primary/15 flex items-center gap-2 rounded-lg p-2 text-xl md:text-base ${active ? "bg-primary/15 font-semibold shadow-inner" : ""} ${className}`}
      hidden={hidden}
    >
      {icon && (active ? iconActive || icon : icon)}
      {text && (
        <span className={disableResponsiveness ? "text-sm" : "hidden md:block"}>
          {text}
        </span>
      )}
    </Link>
  );
};

export default NavLink;
