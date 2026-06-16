import Image from "next/image";
import {Button, Card, CardContent, Form, Input, Label, Link, InputGroup, Spinner} from "@heroui/react";
import {Eye, EyeSlash} from "@gravity-ui/icons";
import {useState} from "react";
import useRegister from "./useRegister";
import { Controller } from "react-hook-form";

const Register = () => {
    const {
        control,
        handleSubmit,
        errors,
        handleRegister,
        isPendingRegister
    } = useRegister();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    return (
        <div className="flex w-full flex-col lg:flex-row items-center justify-center gap-8 lg:gap-20 p-4">
            <div className="flex w-full lg:w-1/2 flex-col items-center justify-center gap-6 lg:gap-10">
                <Image src={"/images/general/logo.svg"} alt="Logo" width={180} height={180} className="w-32 md:w-44" />
                <Image src={"/images/illustrations/login.svg"} className="hidden md:block w-800 md:w-[450px] lg:w-full lg:max-w-[550px] object-contain" alt="Login" width={1024} height={1024} />
            </div>
              <Card className="w-full max-w-md p-6 sm:p-8">
                <CardContent>
                    <h2 className="text-xl font-bold text-danger">Create Account</h2>
                    <p className="mb-4 text-small">Have an account?&nbsp;
                        <Link href={"/auth/login"} className="font-semibold text-dange   r">Login here</Link>
                    </p>
                    <Form className="flex w-full flex-col" onSubmit={handleSubmit(handleRegister)}>
                        <div className="flex w-full flex-col gap-4">
                            {/* Fullname */}
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="register-fullname">Fullname</Label>
                                <Controller
                                    name="fullName"
                                    control={control}
                                    render={({ field }) => (
                                        <Input {...field} id="register-fullname" placeholder="enter your fullname" type="text" className="w-full" />
                                    )}
                                />
                                {errors.fullName && (
                                    <p className="text-xs text-danger">{errors.fullName.message}</p>
                                )}
                            </div>

                            {/* Username */}
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="register-username">Username</Label>
                                <Controller
                                    name="userName"
                                    control={control}
                                    render={({ field }) => (
                                        <Input {...field} id="register-username" placeholder="enter your username" type="text" className="w-full" />
                                    )}
                                />
                                {errors.userName && (
                                    <p className="text-xs text-danger">{errors.userName.message}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="register-email">Email</Label>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <Input {...field} id="register-email" placeholder="enter your email" type="email" className="w-full" />
                                    )}
                                />
                                {errors.email && (
                                    <p className="text-xs text-danger">{errors.email.message}</p>
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

                            {/* Confirm Password */}
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="register-confirm-password">Confirm password</Label>
                                <Controller
                                    name="confirmPassword"
                                    control={control}
                                    render={({ field }) => (
                                        <InputGroup className="w-full">
                                            <InputGroup.Input
                                                {...field}
                                                id="register-confirm-password"
                                                className="w-full"
                                                placeholder="enter your confirm password"
                                                type={isConfirmPasswordVisible ? "text" : "password"}
                                            />
                                            <InputGroup.Suffix className="pr-0">
                                                <Button
                                                    isIconOnly
                                                    aria-label={isConfirmPasswordVisible ? "Hide password" : "Show password"}
                                                    size="sm"
                                                    variant="ghost"
                                                    onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                                                >
                                                    {isConfirmPasswordVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                                                </Button>
                                            </InputGroup.Suffix>
                                        </InputGroup>
                                    )}
                                />
                                {errors.confirmPassword && (
                                    <p className="text-xs text-danger">{errors.confirmPassword.message}</p>
                                )}
                            </div>
                        </div>
                        {errors.root && (
                            <p className="text-xs text-danger text-center mt-2">{errors.root.message}</p>
                        )}
                        <Button fullWidth type="submit" variant="danger" className="mt-4" isDisabled={isPendingRegister}>
                            {isPendingRegister ? (
                                <Spinner color="accent"/>
                            )  : (
                                "Register"
                            )}
                        </Button>
                    </Form>     
                </CardContent>
              </Card>
        </div>
    )
}

export default Register;