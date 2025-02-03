"use client";
import { useState, useEffect } from "react";
import React from "react";
import InputDefault from "@/Components/InputDefault";
import FormsBase from "@/Components/FormsBase";
import PopupWarning from "@/Components/PopupWarning";

export default function Home() {

  return (
    <div className="items-center justify-items-center px-8 pt-8 gap-16 h-fit">
      <PopupWarning />
      <main className="flex flex-col gap-8 row-start-2 items-center h-fit">
        <div className="max-w-[1200px]">
        <FormsBase />
        </div>
      </main>
    </div>
  );
}
