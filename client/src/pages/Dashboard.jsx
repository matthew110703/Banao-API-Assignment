import {
  Container,
  PostCard,
  Button,
  Input,
  Badge,
  NavLink,
  FloatingButton,
  NewPostForm,
} from "../components";

//  Icons
import { IoCreateOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import {
  FaRegHeart as OutlineHeart,
  FaHeart as FilledHeart,
  FaRegBookmark as OutlineBookmark,
  FaBookmark as FilledBookmark,
} from "react-icons/fa";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setPosts } from "../store/postSlice";

// Services
import { getPosts } from "../services/postService";

const Dashboard = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const posts = useSelector((state) => state.post.posts);

  useEffect(() => {
    getPosts().then((res) => {
      console.log(res.posts);
      dispatch(setPosts(res.posts));
    });
  }, [dispatch]);

  return (
    <Container>
      <section
        aria-label="Dashboard"
        className="mt-4 grid-cols-4 gap-8 lg:grid"
      >
        <div className="col-span-3 space-y-4">
          <header className="border-primary/50 sticky flex items-center justify-between border-b p-2">
            {/* Tabs */}
            <nav className="flex items-center gap-4">
              <NavLink text={"All Posts"} active disableResponsiveness />
              <NavLink text={"My Posts"} disableResponsiveness />
              <NavLink
                text={"Liked"}
                icon={<OutlineHeart />}
                iconActive={<FilledHeart />}
                className={"hidden md:flex"}
              />
              <NavLink
                text={"Saved"}
                icon={<OutlineBookmark />}
                iconActive={<FilledBookmark />}
                className={"hidden md:flex"}
              />
            </nav>

            <Button
              text={"New Post"}
              icon={<IoCreateOutline size={18} />}
              className={"hidden md:flex"}
            />
            <FloatingButton />
          </header>
          <NewPostForm />

          {/* Post Feed */}
          <div className="post-feed mx-auto mb-8 space-y-4 overflow-y-auto lg:max-h-[calc(90vh-2rem)]">
            {posts.map((post) => (
              <PostCard key={post._id} {...post} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="border-primary/15 hidden border-l lg:block">
          <h2 className="p-2 text-lg font-bold">Dashboard</h2>

          {/* Filters */}
          <div className="flex flex-col items-start gap-8 p-2">
            {/* Search Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Search for Posts...");
              }}
              className="w-full"
            >
              <Input
                id={"search"}
                name={"search"}
                placeholder={"Search for Posts..."}
                icon={<CiSearch size={18} />}
              />
            </form>

            {/* Tags */}
            <div className="space-y-2">
              <h3 className="text-md font-semibold">Tags</h3>
              <div className="flex flex-wrap items-start gap-2">
                <Badge text={"React"} />
                <Badge text={"JavaScript"} />
                <Badge text={"Python"} />
                <Badge text={"Django"} />
                <Badge text={"Node.js"} />
                <Badge text={"MongoDB"} />
                <Badge text={"Express"} />
                <Badge text={"React Native"} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Dashboard;
