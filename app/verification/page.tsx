"use client";

import { Suspense } from 'react';
 
import CertificateVerifier from "../components/CertificateVerifier";
import Link from 'next/link';

export default function VerifyPage() {
  return (
    <main className="relative min-h-screen w-full ">
      
 
     
      <div className="flex flex-col min-h-screen p-4">
         <div className='w-full'>
        <ExploreAppbar />
      </div>
      <div className='w-full flex items-center justify-center min-h-screen'>
          <CertificateVerifier />
      </div>
      </div>

    </main>
  );
}


function ExploreAppbar() {
  return (
    <div className="flex items-start justify-start w-full ">
      <Link href={"/"} className="text-2xl md:text-3xl font-bold">
        PERSEVEX
      </Link>
    </div>
  );
}
