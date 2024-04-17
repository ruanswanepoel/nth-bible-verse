"use client";

import PrettyInput from "@/components/pretty-input";
import { nth_verse, nth_verse_nt } from "@/lib/nth_verse";
import Image from "next/image";
import React from "react";

import { FiSearch } from "react-icons/fi";

export default function Home() {
  const [value, setValue] = React.useState("");
  const [result, setResult] = React.useState(null);

  console.log(result);

  return (
    <main className="min-h-screen p-12 md:p-24 w-full flex justify-center">
      <div className=" flex flex-col items-center gap-20 xl:w-[50vw]">
        <div className="flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-slate-700 text-center">
              N<span className="font-semibold text-slate-500 text-2xl">th</span>{" "}
              Bible Verse
            </h1>
            <h3 className="text-slate-500 text-center">
              A tool to find the Nth verse in the KJV bible
            </h3>
          </div>
          <div className="flex gap-2 relative w-full">
            <PrettyInput
              placeholder="Enter a Number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            ></PrettyInput>
            <div className="absolute right-0 h-full flex items-center p-2">
              <button
                className="rounded-full bg-slate-200 h-full flex items-center justify-center aspect-square hover:scale-105 transition-all"
                onClick={() => {
                  const n = parseInt(value);
                  setResult({
                    all: nth_verse(n),
                    nt: nth_verse_nt(n),
                  });
                }}
              >
                <FiSearch />
              </button>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="grid grid-rows-2 md:grid-cols-2 gap-12 animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-center">WHOLE BIBLE</h3>
              {result?.all && (
                <div className="bg-slate-200 p-4 rounded-xl h-full">
                  <p className="font-bold">{result.all.name}</p>
                  <p>{result.all.verse}</p>
                </div>
              )}
              {result && !result?.all && (
                <div className="w-full text-center">No Result Found!</div>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-center">NEW TESTAMENT</h3>
              {result?.nt && (
                <div className="bg-slate-200 p-4 rounded-xl h-full">
                  <p className="font-bold">{result.nt.name}</p>
                  <p>{result.nt.verse}</p>
                </div>
              )}
              {result && !result?.nt && (
                <div className="w-full text-center">No Result Found!</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
