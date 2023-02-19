import React from "react";
import Head from "next/head";
import { Inter } from "@next/font/google";
import Messege from "@/components/Messege";
import { useEffect, useState } from "react";
import { db } from "@/utils/firebase-config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [allPosts, setAllPosts] = useState([]);

  const getPosts = async () => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="my-12 text-lg font-medium">
        <h2 className="">See what other people are saying</h2>

        {allPosts.map((post) => (
          <React.Fragment key={post.id}>
            <Messege {...post}></Messege>
          </React.Fragment>
        ))}
        
      </div>
    </>
  );
}
