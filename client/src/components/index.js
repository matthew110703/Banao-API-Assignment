// Layout Componets
import NavBar from "./layout/NavBar";
import Container from "./layout/Container";

export { NavBar, Container };

// UI Components (Reusable)
import Button from "./ui/Button";
import LikeButton from "./ui/LikeButton";
import NavLink from "./ui/NavLink";
import SaveButton from "./ui/SaveButton";
import PostCard from "./ui/PostCard";
import Badge from "./ui/Badge";
import Input from "./ui/Input";
import FloatingButton from "./ui/FloatingButton";

export {
  Button,
  LikeButton,
  NavLink,
  SaveButton,
  PostCard,
  Badge,
  Input,
  FloatingButton,
};

// Forms
import SignUp from "./forms/SignUp";
import Login from "./forms/Login";
import NewPost from "./forms/NewPost";

export { SignUp as SignUpForm, Login as LoginForm, NewPost as NewPostForm };
