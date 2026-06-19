import AuthLayout from "@/components/layouts/AuthLayout";
import RegisterSucces from "@/components/commons/views/Auth/RegisterSucces";


const RegisterPage = () => {
    return(
        <AuthLayout title="Ticketing Concert - Register">
            <RegisterSucces />
        </AuthLayout>
    )
}

export default RegisterPage;