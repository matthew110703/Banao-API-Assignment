import Button from "../ui/Button";
import { useState, useRef } from "react";
import { createPost } from "../../services/postService";

// Redux
import { useDispatch } from "react-redux";
import { addPost } from "../../store/postSlice";

const NewPost = () => {
  const dispatch = useDispatch();

  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = () => {
    fileRef.current.click();
  };

  const handlePreview = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      if (selectedFile.size > 50 * 1024 * 1024) {
        setError("File size must be less than 50MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setError("");
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Content cannot be empty");
      return;
    }
    console.log(file);

    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("content", content);
      if (file) {
        formData.append("image", file);
      }

      console.log("Content:", formData.get("content"));
      console.log("Image:", formData.get("image")); // Should show the File object

      // const res = await createPost(formData);
      // if (!res || !res.post) {
      //   throw new Error("Invalid response from server");
      // }

      // dispatch(addPost(res.post));

      setContent("");
      setFile(null);
      setPreview(null);
    } catch (err) {
      console.error("Failed to create post:", err);
      setError("Failed to create post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setContent("");
    setFile(null);
    setPreview(null);
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg p-2"
      encType="multipart/form-data"
    >
      <Button
        text={"Add Image"}
        className={"float-end text-xs"}
        onClick={handleFile}
        aria-label="Add Image"
      />
      <input
        ref={fileRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handlePreview}
      />
      <textarea
        name="content"
        id="content"
        rows={3}
        className="w-full rounded border p-2"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        aria-label="Post content"
      ></textarea>

      {preview && (
        <figure className="rounded-lg bg-gray-200 shadow-lg">
          <img
            src={preview}
            alt="Preview"
            className="h-[400px] w-full rounded-lg object-contain"
          />
        </figure>
      )}

      {error && <p className="text-center text-sm text-red-500">{error}</p>}

      <div className="flex justify-end gap-2">
        <Button text={"Cancel"} onClick={handleCancel} disabled={isLoading} />
        <Button
          type="submit"
          text={isLoading ? "Posting..." : "Post"}
          disabled={isLoading}
        />
      </div>
    </form>
  );
};

export default NewPost;
