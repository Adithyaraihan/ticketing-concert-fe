import { Button, Card, CardContent, Link } from "@heroui/react";
import Image from "next/image";

interface PropTypes{
    status: "success" | "failed"
}

const Activation = (props: PropTypes) => {
    const {status} = props

    return (
        <div className="flex w-full flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md p-6 sm:p-8 flex flex-col items-center text-center gap-6 shadow-xl border border-default-100 bg-background/60 backdrop-blur-md">
                <CardContent className="flex flex-col items-center gap-6 w-full p-0">
                    <Image 
                        src="/images/general/logo.svg" 
                        alt="Logo" 
                        width={180} 
                        height={180} 
                        className="w-32 md:w-40 object-contain mb-2" 
                    />
                    <div className="relative flex items-center justify-center w-40 h-40 md:w-48 md:h-48 my-2">
                        <div className="absolute inset-0 bg-danger/10 rounded-full blur-xl scale-75 animate-pulse"></div>
                        <Image 
                            src={status === 'success'? "/images/illustrations/success.svg" : "/images/illustrations/pending.svg"} 
                            className="relative w-full h-full object-contain" 
                            alt="Success" 
                            width={200} 
                            height={200} 
                            priority
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-extrabold text-danger tracking-tight">
                            {status === "success" ? 'Account Activated' : 'Activation Failed'}
                        </h1>
                        <p className="text-sm text-default-500 font-medium leading-relaxed">
                            {status === "success" ? 'Your account has been activated successfully. You can now login to your account.' : 'Your account activation failed. Please try again later.'}
                        </p>
                    </div>
                    <Link href="/auth/login" className="w-full hover:no-underline">
                        <Button
                            variant="danger"
                            size="lg"
                            className="mt-4 w-full font-bold rounded-full"
                        >
                            Go to Login
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
};

interface PropTypes{
    status: "success" | "failed"
}

export default Activation;