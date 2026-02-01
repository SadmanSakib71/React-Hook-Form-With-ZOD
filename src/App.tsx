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
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          {...register("email", {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          })}
          type="text"
          placeholder="Email"
        />
        {errors.email && <div className="text-red-500">My Name is khan</div>}
        <label>Password</label>
        <input
          {...register("password", { required: true, minLength: 6 })}
          type="password"
          placeholder="password"
        />
        <input type="submit" />
      </form>
    </>
  );
}

export default App;
