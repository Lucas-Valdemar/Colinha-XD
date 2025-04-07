"use client";
import { useState, useEffect } from "react";
import React from "react";
import InputDefault from "@/components/InputDefault";
import PopupWarning from "@/components/PopupWarning";
import ThemeToggle from "@/components/ThemeToggle";
import T21pppnForms from "./components/T21pppnForms";

export default function T21PPPN() {
  const [tela, setTela] = useState(false);
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    setTela(true);
  }, []);

  useEffect(() => {
    // Recupera a senha salva localmente
    const savedPassword = localStorage.getItem("page_password");
    if (savedPassword && savedPassword === process.env.NEXT_PUBLIC_PAGE_SECRET_PASSWORD) {
      setAuthorized(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_PAGE_SECRET_PASSWORD) {
      localStorage.setItem("page_password", password);
      setAuthorized(true);
    } else {
      alert("Senha incorreta.");
    }
  };

  if (!authorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-4">
        <h1 className="text-xl font-bold">Área restrita</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Digite a senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-4 py-2 rounded-md"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="items-center justify-items-center px-8 pt-8 gap-16 h-fit">
      <PopupWarning />
      <main className="flex flex-col gap-8 row-start-2 items-center h-fit">
        <div className="absolute top-0 right-0 pt-3 pr-8">
          <ThemeToggle />
        </div>
        <div className="max-w-[1200px]">
          <T21pppnForms />
        </div>
      </main>
    </div>
  );
}
