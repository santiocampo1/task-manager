import { useForm } from "react-hook-form";

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  })

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold">Login</h1>
        <form onSubmit={onSubmit}>
          <input className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" type="email"  {...register("email", { required: true })} placeholder="Email" />
          {errors.email && (<p className="text-red-500 text-xs italic">Email is required</p>)}
          <input className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" type="password"  {...register("password", { required: true })} placeholder="Password" />
          {errors.password && (<p className="text-red-500 text-xs italic">Password is required</p>)}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage; 