import Layout from "../../components/layout";

export default function Contact() {
    return (
        <Layout>
            <p className="my-3">Chtr.ai was developed by Andrew Akers.</p>
            <ul className="mb-3">
                <li><a className="underline" href="https://www.linkedin.com/in/andrewpakers/">LinkedIn</a></li>
                <li><a className="underline" href="https://twitter.com/AndrewPAkers">Twitter</a></li>
                <li><a className="underline" href="https://infosec.exchange/@andrewpakers">Mastodon</a></li>
            </ul>
        </Layout>
    );
}