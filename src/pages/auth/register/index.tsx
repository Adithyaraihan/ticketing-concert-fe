import Register from "@/components/commons/views/Register";
import AuthLayout from "@/components/layouts/AuthLayout";


const RegisterPage = () => {
    return(
        <AuthLayout title="Ticketing Concert - Register">
            <Register />
        </AuthLayout>
    )
}

export default RegisterPage;