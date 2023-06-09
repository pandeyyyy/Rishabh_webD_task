export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}

import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

import Image from "next/image";
import { Inter } from "next/font/google";
import Banner from "@/components/Banner";
import List from "@/components/List";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ list }) {
  console.log(list);
  return (
    <main className={` ${inter.className} flex flex-col items-center`}>
      <Banner topThree={list.slice(0, 3)} />
      <List others={list.slice(3)} />
    </main>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch(
      "https://www.coursehubiitg.in/api/codingweek/contributions"
    );
    const data = await response.json();
    const sortedData = data.sort((a, b) => b.points - a.points);
    return {
      props: {
        list: sortedData,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        list: [],
      },
    };
  }
}
