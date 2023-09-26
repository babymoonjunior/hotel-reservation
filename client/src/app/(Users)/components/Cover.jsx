import React from "react";
import SearchBar from "@/components/SearchBar";

export default function Cover() {
  return (
    <section
      className="relative w-full h-screen max-h-[900px] mx-auto bg-no-repeat bg-cover max-w-[1440px]"
      style={{ backgroundImage: 'url("/image/coverImage.png")' }}
    >
      <article className="flex flex-col items-center justify-center w-full h-full gap-28">
        <h1 className="max-w-3xl font-medium leading-tight text-center font-serif tracking-[-1.76px] text-utility-white text-7xl">
          A Best Place for Your Neatly Experience{" "}
        </h1>
        <SearchBar page="landingpage" />
      </article>
      {/* <SearchBar page="landingpage" /> */}
    </section>
  );
}
