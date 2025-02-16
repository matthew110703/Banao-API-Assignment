import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Pages
import { Login, SignUp, Dashboard, Account, ForgotPassword } from "./pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
