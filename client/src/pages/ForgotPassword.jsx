import { useState } from "react";
import { useNavigate } from "react-router-dom";

// UI
import { Input, Button } from "../components";

// Icons
import { IoMdLock } from "react-icons/io";
import { MdDataSaverOff, MdEmail } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-black/25">
      <div className="bg-secondary min-w-md space-y-4 rounded-lg p-8 shadow-lg">
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Forgot Password</h1>
          <button onClick={() => navigate("/")}>
            <IoMdClose size={24} />
          </button>
        </header>
        {!isVerified && (
          <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
            <p className="text-md font-semibold">Verify your email</p>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email Address"
              required
              icon={<MdEmail />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              text={"Verify"}
              icon={<MdDataSaverOff size={24} />}
              className="w-full"
              onClick={() => setIsVerified(true)}
            />
          </form>
        )}

        {isVerified && (
          <form className="space-y-4">
            <p className="text-md font-semibold">Reset your password</p>
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              required
              icon={<IoMdLock />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              required
              icon={<IoMdLock />}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            <Button
              type="submit"
              text={"Reset Password"}
              icon={<MdDataSaverOff size={24} />}
              className="w-full"
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
