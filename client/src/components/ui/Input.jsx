const Input = ({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  required = false,
  icon,
}) => {
  return (
    <div className="focus-within:ring-primary border-primary/15 bg-secondary flex items-center gap-3 rounded-lg border px-2 py-1.5 shadow focus-within:ring-2">
      {icon && <span>{icon}</span>}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="text-primary w-full bg-transparent py-1 focus:outline-none"
      />
    </div>
  );
};

export default Input;
