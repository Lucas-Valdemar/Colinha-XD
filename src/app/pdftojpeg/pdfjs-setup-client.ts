'use client';

import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker.min';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

export default pdfjsLib;