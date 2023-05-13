import Layout from "../components/layout";
import Carousel from "../components/carousel";

export default function Home() {

  return (
    <Layout>
      <main className="flex flex-col">
        <Carousel />

        <h1 className="font-bold text-2xl">
          Welcome to Chtr.ai
        </h1>

        <p className="font-light">
          Get started by editing <code>pages/index.js</code>
        </p>

        <div className="">
          <a href="https://nextjs.org/docs" className="">
            <h3 className="font-bold">Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className="">
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className=""
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className=""
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>
    </Layout>
  );
}
