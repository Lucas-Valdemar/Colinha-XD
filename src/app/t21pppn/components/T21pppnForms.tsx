import React, { useState, useRef } from "react";
import T21pppnSenProcModule from ".././components/T21pppnSenProcModule";
import T21pppnPrestModule from ".././components/T21pppnPrestModule";
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
const useGeneratedText = () => {
  const initialState = {
    senhas: [""],
    procedimentos: [""],
    prestadores: [
      {
        prestNome: "",
        prestEndereco: "",
        prestNumero: "",
        prestComplemento: "",
        prestBairro: "",
        prestCEP: "",
        telefone1: "",
        telefone2: "",
        telefone3: "",
        senhas: [""],
        procedimentos: [""],
      }
    ],prestador: {
      prestNome: "",
      prestEndereco: "",
      prestNumero: "",
      prestComplemento: "",
      prestBairro: "",
      prestCEP: "",
      telefone1: "",
      telefone2: "",
      telefone3: "",
    },
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cep: "",
    telefone: "",
    telefone2: "",
    telefone3: "",
  };
  
  const addPrestador = () => {
    const novoPrestador = {
      prestNome: "",
      prestEndereco: "",
      prestNumero: "",
      prestComplemento: "",
      prestBairro: "",
      prestCEP: "",
      telefone1: "",
      telefone2: "",
      telefone3: "",
      senhas: [""],
      procedimentos: [""],
    };
    setFormData((prevData) => ({
      ...prevData,
      prestadores: [...prevData.prestadores, novoPrestador],
    }));
  };

  const [formData, setFormData] = useState(initialState);


  const handleSenhaChange = (prestIndex: number, senhaIndex: number, value: string) => {
    const novosPrestadores = [...formData.prestadores];
    novosPrestadores[prestIndex].senhas[senhaIndex] = value;
    setFormData({ ...formData, prestadores: novosPrestadores });
  };

 const handleProcedimentoChange = (prestIndex: number, procIndex: number, value: string) => {
  const novosPrestadores = [...formData.prestadores];
  novosPrestadores[prestIndex].procedimentos[procIndex] = value;
  setFormData({ ...formData, prestadores: novosPrestadores });
};
  const handlePrestadorChange = (index: number, key: keyof typeof initialState.prestadores[0], value: string) => {
    const novosPrestadores = [...formData.prestadores];
    novosPrestadores[index] = {
      ...novosPrestadores[index],
      [key]: value
    };
    setFormData({ ...formData, prestadores: novosPrestadores });
  };

  const addSenhaProcedimento = (prestIndex: number) => {
    const novosPrestadores = [...formData.prestadores];
    novosPrestadores[prestIndex].senhas.push("");
    novosPrestadores[prestIndex].procedimentos.push("");
    setFormData({ ...formData, prestadores: novosPrestadores });
  };

 const removeSenhaProcedimento = (prestIndex: number, index: number) => {
  const novosPrestadores = [...formData.prestadores];
  if (novosPrestadores[prestIndex].senhas.length > 1) {
    novosPrestadores[prestIndex].senhas = novosPrestadores[prestIndex].senhas.filter((_, i) => i !== index);
    novosPrestadores[prestIndex].procedimentos = novosPrestadores[prestIndex].procedimentos.filter((_, i) => i !== index);
    setFormData({ ...formData, prestadores: novosPrestadores });
  }
};

  const resetForm = () => {
    setFormData(initialState);
  };

  
  const formattedText = `PREZADO SR(A) [_NM_BENEFICIARIO_] ` + 
  formData.prestadores.map(prest => {
    const procedimentos = (prest.procedimentos || []).filter(Boolean).map(p => `"${p}"`).join(" / ");
    const senhas = (prest.senhas || []).filter(Boolean).map(s => `"${s}"`).join(" / ");
    
    return `SOLICITAÇÃO DE ${procedimentos} AUTORIZADA POR SENHA: ${senhas} E NÚMERO DE PROTOCOLO: [_NU_PROTOCOLO_] PARA PRESTADOR: ${prest.prestNome || ""}
${prest.prestEndereco ? "ENDEREÇO: " + prest.prestEndereco : ""}${prest.prestNumero ? ", N - " + prest.prestNumero : ""}${prest.prestComplemento ? ", " + prest.prestComplemento : ""}${prest.prestBairro ? ", "+ prest.prestBairro : ""}${prest.prestCEP ? ", CEP: " + prest.prestCEP : ""}.
${prest.telefone1 ? "TELEFONE: " + prest.telefone1 : ""}${prest.telefone2 ? " / " + prest.telefone2 : ""}${prest.telefone3 ? " / " + prest.telefone3 : ""}.`;
  }).join(" ") +
  ` EM CASO DE DÚVIDAS, ENTRE EM CONTATO COM A CENTRAL DE ATENDIMENTO 4090 1740 OU 0800 409 1740. 0800 463 4648`
  .replace(/\n/g, ' ')
  .replace(/\s{2,}/g, ' ')
  .toUpperCase();
  return {
    formData,
    handleSenhaChange,
    handleProcedimentoChange,
    addSenhaProcedimento,
    removeSenhaProcedimento,
    resetForm,
    formattedText,
    setFormData,
    addPrestador,
  };
};

const cleanPrestador = (prest: any): Prestador => ({
  prestNome: prest.prestNome,
  prestEndereco: prest.prestEndereco,
  prestNumero: prest.prestNumero,
  prestComplemento: prest.prestComplemento,
  prestBairro: prest.prestBairro,
  prestCEP: prest.prestCEP,
  telefone1: prest.telefone1,
  telefone2: prest.telefone2,
  telefone3: prest.telefone3,
});


const T21pppnForms = () => {
  const {
    formData,
    handleSenhaChange,
    handleProcedimentoChange,
    addSenhaProcedimento,
    removeSenhaProcedimento,
    resetForm,
    formattedText,
    setFormData,
    addPrestador,
  } = useGeneratedText();

  const formattedTextRef = useRef<HTMLDivElement | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [copyError, setCopyError] = useState(false);


  const handleCopyClick = async (event: React.MouseEvent) => { 
    if (formattedTextRef.current) {
      try {
        await navigator.clipboard.writeText(formattedText);
        formattedTextRef.current.classList.add("copied");
  
        setTimeout(() => {
          if (formattedTextRef.current) {
            formattedTextRef.current.classList.remove("copied");
          }
        }, 1500);
  
        showFloatingMessage("Texto copiado!", event); 
      } catch (err) {
        console.error("Falha ao copiar:", err);
        setCopyError(true);
        if (event) { 
          showFloatingMessage("Falha ao copiar o texto!", event);
        }
      }
    }
  };
  
  const showFloatingMessage = (message: string, event: React.MouseEvent) => {
    if (event) {
      const x = event.clientX;
      const y = event.clientY;
  
      const messageElement = document.createElement("div");
      messageElement.textContent = message;
      messageElement.style.position = "absolute";
      messageElement.style.top = `${y - 30}px`; // Ajuste a posição vertical
      messageElement.style.left = `${x + 10}px`; // Ajuste a posição horizontal
      messageElement.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; // Cor de fundo
      messageElement.style.color = "white"; // Cor do texto
      messageElement.style.padding = "5px 10px"; // Espaçamento interno
      messageElement.style.borderRadius = "5px"; // Borda arredondada
      messageElement.style.zIndex = "9999"; // Garante que a mensagem fique acima de outros elementos
      document.body.appendChild(messageElement);
  
      setTimeout(() => {
        document.body.removeChild(messageElement);
      }, 2000); // Tempo de exibição da mensagem
    }
  };
  return (
    <div className="flex flex-col" >
      <h2 style={{marginBottom: "10px"}}>FORMULÁRIOS DE DADOS</h2>
    <div className="flex flex-col">
    
 
   

      
      </div>
      
      {formData.prestadores.map((prest, prestIndex) => (
  <div key={prestIndex} className="mb-4 border p-2 rounded">
    {prest.senhas.map((senha, index) => (
      <T21pppnSenProcModule
        key={index}
        senha={senha}
        procedimento={prest.procedimentos[index]}
        index={index}
        total={prest.senhas.length}
        onSenhaChange={(idx, val) => handleSenhaChange(prestIndex, idx, val)}
        onProcedimentoChange={(idx, val) => handleProcedimentoChange(prestIndex, idx, val)}
        onRemove={(idx) => removeSenhaProcedimento(prestIndex, idx)}
      />
    ))}
    <button onClick={() => addSenhaProcedimento(prestIndex)}>➕ Adicionar Senha/Procedimento</button>

    <T21pppnPrestModule
      value={cleanPrestador(prest)}
      onChange={(updatedPrestador) => {
        const novosPrestadores = [...formData.prestadores];
        novosPrestadores[prestIndex] = {
          ...novosPrestadores[prestIndex],
          ...updatedPrestador,
        };
        setFormData({ ...formData, prestadores: novosPrestadores });
      }}
    />
  </div>
))}
<button
onClick={addPrestador}
style={{ backgroundColor: "#4CAF50", color: "white", marginTop: "10px", padding: "8px", borderRadius: "5px" }}
>
➕ Adicionar Novo Prestador
</button>

     

      <button onClick={resetForm} style={{ backgroundColor: "red", color: "white" , marginTop: "20px"}}>
        🔄 Redefinir
      </button>
     
      <h3 style={{ marginBlock: "20px" }}>Mensagem PPO</h3>
      <div 
        ref={formattedTextRef}
        style={{
          border: "var(--message-border)",
          borderRadius: "5px",
          padding: "10px",
          cursor: "pointer", // Indica que essa área é clicável
        }}
        onClick={handleCopyClick} // Adiciona o evento de clique para copiar a mensagem final
      >
        <p>{formattedText}</p>
      </div>
    </div>
  );
};

export default T21pppnForms;
