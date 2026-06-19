import Login from "@/components/commons/views/Auth/login";
import AuthLayout from "@/components/layouts/AuthLayout";

const LoginPage = () => {
    return (
        <AuthLayout title="Ticketing Concert - Login">
            <Login />
        </AuthLayout>
    );
};

export default LoginPage;
