import { useForm, type SubmitHandler } from "react-hook-form";
import "./App.css";
type FormFields = {
  email: string;
  password: string;
};

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          {...register("email", {
            required: "Email is Required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Email is not valid",
            },
          })}
          type="text"
          placeholder="Email"
        />
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
        <label>Password</label>
        <input
          {...register("password", {
            required: "Password is Required",
            minLength: {
              value: 8,
              message: "password must have at least 8 characters",
            },
          })}
          type="password"
          placeholder="password"
        />
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}
        <button className="w-full" type="submit">
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
      </form>
    </>
  );
}

export default App;
