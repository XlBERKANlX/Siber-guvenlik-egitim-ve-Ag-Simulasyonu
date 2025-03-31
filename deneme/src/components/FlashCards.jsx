"use client";
import React from "react";
import Sidebar from "./Sidebar";
import CardContainer from "./CardContainer";

const FlashCards = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Kumbh+Sans:wght@600;700&display=swap"
        rel="stylesheet"
      />
      <main className="flex w-full h-screen min-h-[1024px]">
        <Sidebar />
        <section className="flex-1 p-5 bg-center bg-cover bg-[url('https://cdn.builder.io/api/v1/image/assets/TEMP/12b66575ad171594d82a5d95dfa9642acfb18c9b')] bg-white bg-opacity-40 max-sm:p-2.5">
          <h1 className="mx-0 my-20 -ml-0.5 text-7xl font-semibold text-center max-md:mx-0 max-md:my-10 max-md:text-5xl max-sm:text-4xl">
            FlashCards
          </h1>
          <CardContainer />
        </section>
      </main>
    </>
  );
};

export default FlashCards;
