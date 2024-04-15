"use client";

import { nth_verse, nth_verse_nt } from "@/lib/nth_verse";
import Image from "next/image";
import React from "react";

export default function Home() {
    const [value, setValue] = React.useState("");
    const [result, setResult] = React.useState(null);

    console.log(result);

    return (
        <main className="min-h-screen p-24 flex flex-col items-center gap-20">
            <div className="flex flex-col items-center gap-12">
                <h1>
                    N<span className="font-light text-2xl">th</span> Bible Verse
                </h1>
                <div className="flex flex-col items-center gap-6">
                    <h3>Type the nth bible verse below</h3>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="w-36 px-2 py-1"
                        />
                        <button
                            className="border border-gray-700 rounded-lg py-1 px-2 hover:scale-105"
                            onClick={() => {
                                const n = parseInt(value);
                                setResult({
                                    all: nth_verse(n),
                                    nt: nth_verse_nt(n),
                                });
                            }}
                        >
                            <Image
                                src="/next.png"
                                alt="Submit arrow"
                                width={22}
                                height={22}
                            />
                        </button>
                    </div>
                </div>
            </div>
            {result && (
                <div className="flex flex-col gap-6">
                    {result?.all && (
                        <div>
                            <h3>Whole bible</h3>
                            <p className="font-bold">{result.all.name}</p>
                            <p>{result.all.verse}</p>
                        </div>
                    )}
                    {result?.nt && (
                        <div>
                            <h3>New Testament</h3>
                            <p className="font-bold">{result.nt.name}</p>
                            <p>{result.nt.verse}</p>
                        </div>
                    )}
                </div>
            )}
        </main>
    );
}
