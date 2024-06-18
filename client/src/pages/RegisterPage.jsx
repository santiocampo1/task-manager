import { useForm } from "react-hook-form";
import { registerRequest } from "../api/auth";

const RegisterPage = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        // console.log(data);  
        const res = await registerRequest(data);
        console.log(res);
    })

    return (
        <div className="bg-zinc-800 max-w-md p-10 rounded-md">
            <form onSubmit={onSubmit}>
                <input className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" type="text" {...register("username", { required: true })} placeholder="Username" />
                <input className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" type="email"  {...register("email", { required: true })} placeholder="Email" />
                <input className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" type="password"  {...register("password", { required: true })} placeholder="Password" />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default RegisterPage