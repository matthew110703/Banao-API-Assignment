const Button = ({
  type = "button",
  text,
  onClick,
  className,
  icon,
  disabled = false,
  hidden = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-primary text-secondary flex items-center justify-center gap-2 rounded-3xl px-4 py-2 text-sm font-semibold shadow-lg transition-all duration-150 hover:scale-105 focus:outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      disabled={disabled}
      hidden={hidden}
    >
      {icon && <span>{icon}</span>}
      {text}
    </button>
  );
};

export default Button;
