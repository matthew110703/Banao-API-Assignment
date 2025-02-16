import { useState } from "react";
import { useNavigate } from "react-router-dom";

// UI
import { Input, Button } from "../components";

// Icons
import { FaUser } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { MdDataSaverOff } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const Account = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-black/25">
      <div className="bg-secondary min-w-md space-y-4 rounded-lg p-8 shadow-lg">
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Account</h1>
          <button onClick={() => navigate("/dashboard")}>
            <IoMdClose size={24} />
          </button>
        </header>
        <form className="space-y-4">
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            required
            icon={<FaUser />}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email Address"
            required
            icon={<IoMdLock />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            text={"Save Changes"}
            icon={<MdDataSaverOff size={24} />}
            className="w-full"
          />
        </form>
      </div>
    </div>
  );
};

export default Account;
