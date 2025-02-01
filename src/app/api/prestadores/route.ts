import { NextResponse } from "next/server";

interface Prestador {
  prestNome: string;
  prestEndereco: string;
  prestNumero: string;
  prestComplemento: string;
  prestBairro: string;
  prestCEP: string;
  telefone1: string;
  telefone2: string;
  telefone3: string;
}

const prestadores: Prestador[] = [
  {
    prestNome: "HOSPITAL E MATER NOSSA SRA ROSARIO",
    prestEndereco: "R. DOUTOR EDSON DE MELO",
    prestNumero: "357",
    prestComplemento: "",
    prestBairro: "VILA MARIA ALTA",
    prestCEP: "02122080",
    telefone1: "1140901740",
    telefone2: "",
    telefone3: "",
  },
  {
    prestNome: "HOSPITAL SAO BERNARDO",
    prestEndereco: "AV. LUCAS NOGUEIRA GARCEZ",
    prestNumero: "400",
    prestComplemento: "ANEXO R MARMARA N161 E",
    prestBairro: "CENTRO",
    prestCEP: "09750660",
    telefone1: "1140901740",
    telefone2: "40901740",
    telefone3: "31552000",
  },
  {
    prestNome: "LAVOISIER MEDICINA DIAGNOSTICA - BELA VISTA",
    prestEndereco: "AV ANTONIO CARLOS COSTA",
    prestNumero: "696",
    prestComplemento: "",
    prestBairro: "BELA VISTA",
    prestCEP: "113047-4488",
    telefone1: "40023633",
    telefone2: "",
    telefone3: "",
  },
  {
    prestNome: "HOSPITAL BOSQUE DA SAUDE",
    prestEndereco: "AV BOSQUE DA SAUDE",
    prestNumero: "1922",
    prestComplemento: "/ 1926",
    prestBairro: "SAUDE",
    prestCEP: "04142082",
    telefone1: "",
    telefone2: "",
    telefone3: "",
  },{
    prestNome: "EINSTEN IMAGENS MEDS LTDA",
    prestEndereco: "AV CONS NEBIAS",
    prestNumero: "741",
    prestComplemento: "",
    prestBairro: "BOQUEIRAO",
    prestCEP: "11045003",
    telefone1: "",
    telefone2: "",
    telefone3: "",
  },{
    prestNome: "FISIOMED FISIOTERAPIA ESPECIAL",
    prestEndereco: "R. SAO PAULO",
    prestNumero: "2296",
    prestComplemento: "",
    prestBairro: "SANTA PAULA",
    prestCEP: "09541100",
    telefone1: "1142278230",
    telefone2: "42278230",
    telefone3: "",
  },{
    prestNome: "CLINICA SAINT NICHOLAS LTDA - SUZANO",
    prestEndereco: "R. VINTE E SETE DE OUTUBRO",
    prestNumero: "106",
    prestComplemento: "",
    prestBairro: "JARDIM SUELY",
    prestCEP: "08674200",
    telefone1: "1147467800",
    telefone2: "",
    telefone3: "",
  },{
    prestNome: "HOSPITAL SALVALUS",
    prestEndereco: "R. BRESSER",
    prestNumero: "1954",
    prestComplemento: "",
    prestBairro: "MOOCA",
    prestCEP: "03164160",
    telefone1: "1140901740",
    telefone2: "",
    telefone3: "",
  },{
    prestNome: "NOTRELABS OSASCO - AUTONOMISTAS",
    prestEndereco: "AV. DOS AUTONOMISTAS",
    prestNumero: "2511",
    prestComplemento: "2515",
    prestBairro: "CENTRO",
    prestCEP: "06090020",
    telefone1: "1140901740",
    telefone2: "31552000",
    telefone3: "",
  },{
    prestNome: "NOTRELABS OSASCO ITABUNA",
    prestEndereco: "R. ITABUNA",
    prestNumero: "76",
    prestComplemento: "ANEXO 84",
    prestBairro: "CENTRO",
    prestCEP: "06010120",
    telefone1: "1140901740",
    telefone2: "31552000",
    telefone3: "",
  },


];

// Função GET com suporte a pesquisa
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.toLowerCase() || "";

  // Filtrando prestadores pelo nome
  const filteredPrestadores = prestadores.filter((prestador) =>
    prestador.prestNome.toLowerCase().includes(query)
  );

  return NextResponse.json(filteredPrestadores);
}
