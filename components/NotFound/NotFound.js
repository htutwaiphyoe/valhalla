import Link from "next/link";

const NotFound = (props) => {
    return (
        <section className="page-not-found-wrapper">
            <h1 id="title_404">404!</h1>
            <h3 id="description_404">
                Page not found! Go to <Link href="/">HomePage</Link>
            </h3>
        </section>
    );
};

export default NotFound;
