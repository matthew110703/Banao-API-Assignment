import { SignUpForm } from "../components";

const SignUp = () => {
  return (
    <section className="container mx-auto flex h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Social Hub</h1>
          <p className="text-xs font-semibold text-gray-500">
            Where connections spark and stories thrive! 🚀🔥
          </p>
        </div>
        <SignUpForm />
      </div>
    </section>
  );
};

export default SignUp;
