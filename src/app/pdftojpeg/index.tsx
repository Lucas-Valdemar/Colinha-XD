"use client";

import dynamic from 'next/dynamic';

const DynamicIndexPage = dynamic(() => import('./page'), {
    ssr: false,
});

export default DynamicIndexPage;