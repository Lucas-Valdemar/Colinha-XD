declare module 'pdf-parse' {
    interface PdfData {
      numpages: number;
      numrender: number;
      info: any;
      metadata: any;
      version: string;
      text: string;
    }
  
    function pdf(dataBuffer: ArrayBuffer | Uint8Array, options?: any): Promise<PdfData>;
    export = pdf;
  }