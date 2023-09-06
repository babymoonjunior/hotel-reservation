import React from "react";
import SearchBar from "@/components/SearchBar";

export default function Cover() {
  return (
    <section
      className="relative w-full h-[900px] bg-no-repeat bg-cover max-w-7xl mx-auto"
      style={{ backgroundImage: 'url("/image/coverImage.png")' }}
    >
      <article className="flex items-center justify-center w-full h-full">
        <h1 className="max-w-3xl font-medium leading-tight text-center font-serif tracking-[-1.76px] text-utility-white text-7xl">
          A Best Place for Your Neatly Experience{" "}
        </h1>
      </article>
      <SearchBar page="landingpage" />
    </section>
  );
}
