import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";


const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signup, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/tasks");
        }
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (values) => {
        signup(values);
    })

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md p-10 rounded-md">
                {
                    registerErrors.map((error, i) => (
                        <div className="bg-red-500 p-2 text-white" key={i}>
                            {error}
                        </div>
                    ))
                }
                <h1 className="text-2xl font-bold">Sign Up</h1>
                <form onSubmit={onSubmit}>
                    <input className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" type="text" {...register("username", { required: true })} placeholder="Username" />
                    {errors.username && (<p className="text-red-500 text-xs italic">Username is required</p>)}
                    <input className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" type="email"  {...register("email", { required: true })} placeholder="Email" />
                    {errors.email && (<p className="text-red-500 text-xs italic">Email is required</p>)}
                    <input className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" type="password"  {...register("password", { required: true })} placeholder="Password" />
                    {errors.password && (<p className="text-red-500 text-xs italic">Password is required</p>)}

                    <button type="submit" className='bg-sky-500 text-white px-4 py-2 rounded-md my-2'>Register</button>

                </form>

                <p className="flex gap-x-2 justify-between">
                    Already have an account?<Link to="/login" className="text-sky-500">Sign in</Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage