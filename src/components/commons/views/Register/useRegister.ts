import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "@/types/Auth";
import authServices from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const registerSchema = yup.object().shape({
    fullName: yup.string().required('Fullname is required'),
    userName: yup.string().required('Username is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup.string()
        .min(6, 'Password must be at least 6 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), ""], 'Passwords must match').required('Confirm Password is required'),
});

const useRegister = () => {
    const router = useRouter();

    const {control, handleSubmit, formState: {errors}, reset, setError} = useForm<IRegister>({
        resolver: yupResolver(registerSchema),
    })


    const registerService = async (payload: IRegister) => {
        const result = await authServices.register(payload);
        return result
    }

    const {mutate: mutateRegister, isPending: isPendingRegister} = useMutation({
        mutationFn: registerService,
        onError(error: any){
            setError('root', {
                message: error.response?.data?.message || error.message,
            })
        },
        onSuccess: () => {
            router.push('/auth/register/success');
            reset();
        }
    })

    const handleRegister = (data: IRegister) => mutateRegister(data);

    return {
        control,
        handleSubmit,
        errors,
        handleRegister,
        isPendingRegister
    }
}   

export default useRegister