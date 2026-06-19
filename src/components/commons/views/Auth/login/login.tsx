import Image from "next/image";
import {Button, Card, CardContent, Form, Input, Label, Link, InputGroup, Spinner} from "@heroui/react";
import {Eye, EyeSlash} from "@gravity-ui/icons";
import {useState} from "react";
import useLogin from "./useLogin";
import { Controller } from "react-hook-form";

const Login = () => {
    const {
        control,
        handleSubmit,
        errors,
        handleLogin, 
        isPendingLogin
    } = useLogin();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <div className="flex w-full flex-col lg:flex-row items-center justify-center gap-8 lg:gap-20 p-4">
            <div className="flex w-full lg:w-1/2 flex-col items-center justify-center gap-6 lg:gap-10">
                <Image src={"/images/general/logo.svg"} alt="Logo" width={180} height={180} className="w-32 md:w-44" />
                <Image src={"/images/illustrations/login.svg"} className="hidden md:block w-800 md:w-[450px] lg:w-full lg:max-w-[550px] object-contain" alt="Login" width={1024} height={1024} />
            </div>
              <Card className="w-full max-w-md p-6 sm:p-8">
                <CardContent>
                    <h2 className="text-xl font-bold text-danger">Login</h2>
                    <p className="mb-4 text-small">Dont{"'"} Have an account?&nbsp;
                        <Link href={"/auth/register"} className="font-semibold text-danger">Register here</Link>
                    </p>
                    <Form className="flex w-full flex-col" onSubmit={handleSubmit(handleLogin)}>
                        <div className="flex w-full flex-col gap-4">
                         

                            {/* Username */}
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="register-username">Username or Email</Label>
                                <Controller
                                    name="identifier"
                                    control={control}
                                    render={({ field }) => (
                                        <Input {...field} id="register-username" placeholder="enter your identifier" type="text" className="w-full" />
                                    )}
                                />
                                {errors.identifier && (
                                    <p className="text-xs text-danger">{errors.identifier.message}</p>
                                )}
                            </div>


                            {/* Password */}
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="register-password">Password</Label>
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field }) => (
                                        <InputGroup className="w-full">
                                            <InputGroup.Input
                                                {...field}
                                                id="register-password"
                                                className="w-full"
                                                placeholder="enter your password"
                                                type={isPasswordVisible ? "text" : "password"}
                                            />
                                            <InputGroup.Suffix className="pr-0">
                                                <Button
                                                    isIconOnly
                                                    aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                                                    size="sm"
                                                    variant="ghost"
                                                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                                                >
                                                    {isPasswordVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                                                </Button>
                                            </InputGroup.Suffix>
                                        </InputGroup>
                                    )}
                                />
                                {errors.password && (
                                    <p className="text-xs text-danger">{errors.password.message}</p>
                                )}
                            </div>

                         
                        </div>
                        {errors.root && (
                            <p className="text-xs text-danger text-center mt-2">{errors.root.message}</p>
                        )}
                        <Button fullWidth type="submit" variant="danger" className="mt-4" isDisabled={isPendingLogin}>
                            {isPendingLogin ? (
                                <Spinner color="accent"/>
                            )  : (
                                "Login"
                            )}
                        </Button>
                    </Form>     
                </CardContent>
              </Card>
        </div>
    )
}

export default Login;