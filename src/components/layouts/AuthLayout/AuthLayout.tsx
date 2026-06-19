import PageHead from "@/components/commons/pageHead";
import { Fragment, ReactNode } from "react";

interface PropTypes{
    children: ReactNode;
    title? :string;
}


const AuthLayout = (props: PropTypes) =>{
    const {title, children} = props;

    return(
        <Fragment>
            <PageHead title={title} />
            <section className="max-w-3xl 3xl:container p-6">
                {children}
            </section>
        </Fragment>
    )
}

export default AuthLayout;