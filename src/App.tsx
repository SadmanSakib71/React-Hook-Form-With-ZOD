import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import "./App.css";

const schema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "Sakib@gmail.com",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error();
      console.log(data);
    } catch {
      setError("root", {
        message: "The Email Is Already Taken Bro",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input {...register("email")} type="text" placeholder="Email" />
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
        <label>Password</label>
        <input
          {...register("password")}
          type="password"
          placeholder="password"
        />
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}
        <button className="w-full" type="submit">
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
        {errors.root && (
          <div className="text-red-500">{errors.root.message}</div>
        )}
      </form>
    </>
  );
}

export default App;
