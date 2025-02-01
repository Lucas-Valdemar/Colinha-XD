"use client";
import { useState, useEffect } from "react";
import React from "react";
import InputDefault from "@/Components/InputDefault";
import FormsBase from "@/Components/FormsBase";


export default function Home() {

  return (
    <div className="items-center justify-items-center px-8 pt-8 gap-16 h-fit">
      <main className="flex flex-col gap-8 row-start-2 items-center h-fit">
        <div>
        <FormsBase />
        </div>
      </main>
    </div>
  );
}
