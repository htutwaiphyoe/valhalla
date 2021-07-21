import Head from "next/head";

const Meta = (props) => {
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="keywords" content="hotel valhalla" />
            <meta name="theme-color" content="hsl(250, 69%, 61%)" />

            <meta name="description" content={props.description} />
            <title>{props.title}</title>
        </Head>
    );
};

export default Meta;
