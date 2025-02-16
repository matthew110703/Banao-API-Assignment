import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// UI
import Input from "../ui/Input";
import Button from "../ui/Button";

// Icons
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { RiLoginCircleLine } from "react-icons/ri";

const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (form.password !== form.confirmPassword) {
      console.log("Passwords do not match!");
      return;
    }

    console.log(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h4 className="font-semibold">Sign Up Form</h4>
      <Input
        id="username"
        name="username"
        type="text"
        placeholder="Username"
        required
        icon={<FaUser />}
        value={form.username}
        onChange={handleChange}
      />
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="Email Address"
        required
        icon={<MdEmail />}
        value={form.email}
        onChange={handleChange}
      />
      <Input
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="Create password"
        required
        icon={<IoMdLock />}
        value={form.password}
        onChange={handleChange}
      />
      <Input
        id="confirmPassword"
        name="confirmPassword"
        type={showPassword ? "text" : "password"}
        placeholder="Confirm Password"
        required
        icon={<IoMdLock />}
        value={form.confirmPassword}
        onChange={handleChange}
      />
      <label
        htmlFor="show-password"
        className="flex items-center gap-1 text-xs"
      >
        <input
          type="checkbox"
          id="show-password"
          onClick={() => setShowPassword(!showPassword)}
        />
        <span>Show Password</span>
      </label>

      <div className="space-y-2 pt-4">
        {/* <p className="text-sm font-semibold text-red-500">Errors</p> */}
        <Button
          type={"submit"}
          text={"Sign Up"}
          className={"w-full"}
          icon={<RiLoginCircleLine size={24} />}
        />
        <p className="text-center text-xs">
          Already have an account?{" "}
          <Link to="/" className="cursor-pointer text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignUp;
