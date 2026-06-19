import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILogin } from "@/types/Auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const loginSchema = yup.object().shape({
    identifier: yup.string().required('Please input your email or username'),
    password: yup.string().required('Please input your password'),
});

const useLogin = () => {
    const router = useRouter();

    const {control, handleSubmit, formState: {errors}, reset, setError} = useForm<ILogin>({
        resolver: yupResolver(loginSchema),
    })

    const loginService = async (payload: ILogin) => {
        const result = await signIn("credentials", {
            identifier: payload.identifier,
            password: payload.password,
            redirect: false,
        });
        
        if (result?.error) {
            throw new Error(result.error);
        }
        return result;
    }

    const {mutate: mutateLogin, isPending: isPendingLogin} = useMutation({
        mutationFn: loginService,
        onError(error: any){
            setError('root', {
                message: error.message === "CredentialsSignin" 
                    ? "Invalid email/username or password" 
                    : (error.message || "Login failed"),
            })
        },
        onSuccess: () => {
            router.push('/');
            reset();
        }
    })

    const handleLogin = (data: ILogin) => mutateLogin(data);

    return {
        control,
        handleSubmit,
        errors,
        handleLogin,
        isPendingLogin
    }
}   

export default useLogin;