"use client";

import * as pdfjsLib from 'pdfjs-dist/build/pdf';
// @ts-ignore: Pode não ter tipos declarados corretamente
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

export default pdfjsLib;