"use client";

import { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import loadPdfjs from './pdfjs-setup-client';
import pdfjsLib from './pdfjs-setup-client';
import PopupWarning from '@/components/PopupWarning';

const IndexPage = () => {
    const [directoryHandle, setDirectoryHandle] = useState<FileSystemDirectoryHandle | null>(null);
    const [pdfFile, setPdfFile] = useState<File | null>(null);
      const [password, setPassword] = useState("");
      const [authorized, setAuthorized] = useState(false);


    const handlePdfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setPdfFile(file);
            console.log('Arquivo PDF selecionado:', file);
        }
    };

    const handleOutputPathChange = async () => {
        if (window.showDirectoryPicker) {
            try {
                const handle = await window.showDirectoryPicker();
                setDirectoryHandle(handle);
                console.log('Diretório selecionado:', handle);
            } catch (error) {
                console.error('Erro ao selecionar o local de salvamento:', error);
                alert('Erro ao selecionar o local de salvamento.');
            }
        } else {
            alert('Seu navegador não suporta a seleção de diretórios.');
        }
    };

    const convertPdfToImages = async () => {
      console.log('Iniciando conversão...');
      console.log('PDF file:', pdfFile);
      console.log('Directory handle:', directoryHandle);
  
      if (!pdfFile || !directoryHandle) {
          alert('Selecione um PDF e um local de salvamento.');
          return;
      }
  
      // Carrega o PDF.js dinamicamente no navegador
      const loadedPdfjs = await pdfjsLib;
  
      if (!loadedPdfjs) {
          console.error("Falha ao carregar pdfjsLib.");
          alert("Não foi possível carregar o conversor de PDF.");
          return;
      }
  
      const fileReader = new FileReader();
      fileReader.onload = async () => {
          const typedArray = new Uint8Array(fileReader.result as ArrayBuffer);
          const pdf = await loadedPdfjs.getDocument(typedArray).promise;
  
          for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const viewport = page.getViewport({ scale: 1.5 });
              const canvas = document.createElement('canvas');
              const context = canvas.getContext('2d');
  
              if (context) {
                  canvas.height = viewport.height;
                  canvas.width = viewport.width;
  
                  const renderContext = {
                      canvasContext: context,
                      viewport: viewport,
                  };
  
                  await page.render(renderContext).promise;
  
                  const blob = await new Promise<Blob | null>((resolve) =>
                      canvas.toBlob(resolve, 'image/jpeg')
                  );
                  if (blob) {
                      const fileHandle = await directoryHandle.getFileHandle(`page_${i}.jpg`, { create: true });
                      const writable = await fileHandle.createWritable();
                      await writable.write(blob);
                      await writable.close();
                      console.log(`Imagem page_${i}.jpg salva no diretório.`);
                  }
              } else {
                  console.error(`Falha ao obter o contexto 2D do canvas para a página ${i}.`);
              }
          }
      };
      fileReader.readAsArrayBuffer(pdfFile);
  };

    useEffect(() => {
        // Recupera a senha salva localmente
        const savedPassword = localStorage.getItem("page_password");
        if (savedPassword && savedPassword === process.env.NEXT_PUBLIC_PAGE_SECRET_PASSWORD_PDF) {
          setAuthorized(true);
        }
      }, []);
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === process.env.NEXT_PUBLIC_PAGE_SECRET_PASSWORD_PDF) {
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
        <div className='flex flex-col items-center justify-center mt-10 gap-5'>
            <PopupWarning />
            <button onClick={handleOutputPathChange} className='rounded border-red-600 border-[2px] p-2'>Selecionar Local de Salvamento</button>
            <p>Local de salvamento: {directoryHandle ? 'Selecionado' : 'Não selecionado'}</p>
            <input type="file" accept="application/pdf" onChange={handlePdfChange} className='text-black-700'/>
            <button onClick={convertPdfToImages} className='rounded bg-green-600 p-3 text-shadow-lg' style={{textShadow:"3px 3px 2px black"}}>Converter PDF para Imagens</button>
        </div>
    );
};

export default IndexPage;
