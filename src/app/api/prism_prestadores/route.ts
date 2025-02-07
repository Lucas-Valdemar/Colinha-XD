import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.toLowerCase() || "";

  try {
    const prestadores = await prisma.prestador.findMany({
      where: {
        prestNome: {
          contains: query,
        
        },
      },
    });

    return NextResponse.json(prestadores);
  } catch (error) {
    console.error("Erro ao buscar prestadores:", error);
    return NextResponse.json({ error: "Erro ao buscar prestadores" }, { status: 500 });
  }
}

export async function POST(req: Request) {
    try {
      const body = await req.json();
  
      // Verifica se o body é um array ou um único objeto
      const isArray = Array.isArray(body);
  
      // Função para criar um prestador
      const createPrestador = (data: any) => {
        return prisma.prestador.create({
          data: {
            prestNome: data.prestNome || "",
            prestEndereco: data.prestEndereco || "",
            prestNumero: data.prestNumero || "",
            prestComplemento: data.prestComplemento || "",
            prestBairro: data.prestBairro || "",
            prestCEP: data.prestCEP || "",
            telefone1: data.telefone1 || "",
            telefone2: data.telefone2 || "",
            telefone3: data.telefone3 || "",
          },
        });
      };
  
      let prestadores;
  
      if (isArray) {
        // Se for um array, cria múltiplos prestadores usando Promise.all
        prestadores = await Promise.all(body.map((data: any) => createPrestador(data)));
      } else {
        // Se for um único objeto, cria apenas um prestador
        prestadores = await createPrestador(body);
      }
  
      return NextResponse.json(prestadores);
    } catch (error) {
      console.error("Erro ao criar prestador:", error);
      return NextResponse.json({ error: "Erro ao criar prestador" }, { status: 500 });
    }
  }