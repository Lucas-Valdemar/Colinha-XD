"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { getDocument, GlobalWorkerOptions, PDFDocumentProxy } from 'pdfjs-dist';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';


// Configurar o worker do PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = null as any;


export default function PdfToJpegConverter() {
  const [images, setImages] = useState<Blob[]>([]);
  const [directoryHandle, setDirectoryHandle] = useState<FileSystemDirectoryHandle | null>(null);
  const loadingTask = pdfjsLib.getDocument({
    data: ArrayBuffer,
    // ⛔ desativa completamente o uso de Web Worker para esse PDF
    worker: null,
  });

  const handlePickDirectory = async () => {
    if (!window.showDirectoryPicker) {
      alert("Seu navegador não suporta o acesso ao sistema de arquivos.");
      return;
    }

    try {
      const handle = await window.showDirectoryPicker();
      setDirectoryHandle(handle);
      localStorage.setItem("directoryAccess", JSON.stringify({ name: handle.name }));
    } catch (error) {
      console.error("Erro ao escolher diretório:", error);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const arrayBuffer = await file.arrayBuffer();
    const pdf: PDFDocumentProxy = await getDocument({ data: arrayBuffer }).promise;

    const tempImages: Blob[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) continue;

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((b) => {
          if (b) resolve(b);
          else reject(new Error("Falha ao converter canvas em blob"));
        }, "image/jpeg", 1.0);
      });

      tempImages.push(blob);
    }

    setImages(tempImages);
  }, []);

  const saveAllToDirectory = async () => {
    if (!directoryHandle) {
      alert("Escolha um diretório primeiro.");
      return;
    }

    for (let i = 0; i < images.length; i++) {
      const blob = images[i];
      const fileHandle = await directoryHandle.getFileHandle(`pagina-${i + 1}.jpg`, { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(blob);
      await writable.close();
    }

    alert("Imagens salvas com sucesso!");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Conversor PDF → JPEG</h1>

      <button
        onClick={handlePickDirectory}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Escolher pasta de download
      </button>

      <div
        {...getRootProps()}
        className="border-dashed border-2 border-gray-400 p-10 rounded-md text-center cursor-pointer hover:bg-gray-100"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Solte o PDF aqui...</p>
        ) : (
          <p>Arraste e solte um PDF aqui ou clique para selecionar</p>
        )}
      </div>

      {images.length > 0 && (
        <div className="space-y-2">
          <p>{images.length} página(s) convertida(s)</p>
          <button
            onClick={saveAllToDirectory}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Baixar todas na pasta escolhida
          </button>
        </div>
      )}
    </div>
  );
}