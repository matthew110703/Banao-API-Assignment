const Badge = ({ text, onClick, className, active }) => {
  return (
    <div
      role="button"
      className={`rounded-3xl px-2 py-1 text-xs font-semibold ${active ? "bg-primary/100 text-secondary" : "bg-primary/15 text-primary"} ${className}`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default Badge;
