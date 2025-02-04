"use client";
import { useState, useEffect } from "react";
import React from "react";
import InputDefault from "@/components/InputDefault";
import FormsBase from "@/components/FormsBase";
import PopupWarning from "@/components/PopupWarning";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {

  return (
    <div className="items-center justify-items-center px-8 pt-8 gap-16 h-fit">
      <PopupWarning />
      <main className="flex flex-col gap-8 row-start-2 items-center h-fit">
        <div className="absolute top-0 right-0 pt-3 pr-8">
        <ThemeToggle />
        </div>
        <div className="max-w-[1200px]">
        <FormsBase />
        </div>
      </main>
    </div>
  );
}
