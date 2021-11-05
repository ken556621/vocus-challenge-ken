import Head from "next/head"

const Header = (props) => {
    const {
        title = "",
        description = "",
        image = ""
    } = props;

    return (
        <Head>
            <title>{title}</title>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="article" />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content="200" />
            <meta property="og:image:height " content="200" />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta name="theme-color" content="#FF485A" />
            <link rel="shortcut icon" href="https://d2a6d2ofes041u.cloudfront.net/resize?norotation=true&url=https%3A%2F%2Fimages.vocus.cc%2Fb0113e80-e362-469a-b97a-858c869ff851.png&width=128&sign=-gI8EP6mncYSdbUKFduHAPWKw_nKyccmMnL-Pg8R4Dc" />
        </Head>
    )
}

export default Header;