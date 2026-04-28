"use client";

import dynamic from "next/dynamic";

const Experience = dynamic(
  () => import("@/components/canvas/Experience").then((mod) => mod.Experience),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="w-full h-screen">
      <Experience />
    </main>
  );
}
