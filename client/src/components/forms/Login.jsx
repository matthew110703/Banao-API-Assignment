import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// UI
import Input from "../ui/Input";
import Button from "../ui/Button";

// Icons
import { FaUser } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { RiLoginCircleLine } from "react-icons/ri";

// Services
// import { login } from "../../services/authService";
import { useLoginMutation } from "../../store/authApiSlice";

const Login = () => {
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    let email, username;
    if (user.includes("@") && user.includes(".")) {
      email = user;
    } else {
      username = user;
    }

    setLoading(true);
    const payload = username ? { username, password } : { email, password };
    try {
      const { data, error } = await login(payload);
      if (data.success) {
        localStorage.setItem("accessToken", data.accessToken);
        navigate("/dashboard");
      }
      if (error) {
        console.log(error.data.error);
        setError(error.data.error);
      } else {
        setError(null);
      }
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h4 className="font-semibold">Sign Up Form</h4>
      <Input
        id="user"
        name="user"
        type="text"
        placeholder="Username or Email"
        required
        icon={<FaUser />}
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <Input
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="Create password"
        required
        icon={<IoMdLock />}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex items-center justify-between">
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

        <Link to="/forgot-password" className="text-xs text-blue-500">
          Forgot Password?
        </Link>
      </div>

      <div className="space-y-2 pt-4">
        <p className="text-center text-sm font-semibold text-red-500">
          {error}
        </p>
        {loading && <p className="text-center text-sm">Loading...</p>}
        <Button
          type={"submit"}
          text={"Login"}
          className={"w-full"}
          icon={<RiLoginCircleLine size={24} />}
        />
        <p className="text-center text-xs">
          Don't have an account?{" "}
          <Link to="/signup" className="cursor-pointer text-blue-500">
            Sign Up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
