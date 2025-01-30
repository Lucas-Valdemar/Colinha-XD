"use client";
import { useState, useEffect } from "react";
import React from "react";
import InputDefault from "@/Components/InputDefault";


export default function Home() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex flex-col gap-2 items-end">
          <InputDefault />
        </div>

        <div className="flex flex-col gap-2 items-end">
        </div>
      </main>
    </div>
  );
}
