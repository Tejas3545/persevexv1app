"use client";

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface CertificateData {
  studentName: string;
  domain: string;
  issueDate: string;
}

type VerificationStatus = 'verifying' | 'verified' | 'not-found' | 'error' | 'invalid-link';

interface VerificationResult {
  status: VerificationStatus;
  data?: CertificateData;
  message?: string;
}

interface LoadingState {
  percent: number;
  message: string;
  headline: string;
}

const CheckIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
  </svg>
);

const CrossIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
  </svg>
);

const ShieldCheckIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);


function Verifier() {
  const searchParams = useSearchParams();
  const ENDPOINT = "https://script.google.com/macros/s/AKfycbyCNue8Yv552IExTLgmo-GIyxQI_cqjLWRRias07vkBIOpnF8KDon4VajTvQzdMyt7iYw/exec";
  
  const [result, setResult] = useState<VerificationResult>({ status: 'verifying' });
  const [loadingState, setLoadingState] = useState<LoadingState>({ 
    percent: 0, 
    message: 'Initializing secure connection...', 
    headline: 'Verifying Certificate' 
  });
  const [showResult, setShowResult] = useState(false);
  
  const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

  useEffect(() => {
    const verifyCertificate = async () => {
      const certId = searchParams.get('id');

      if (!certId) {
        setLoadingState({ percent: 100, message: "Invalid verification link", headline: "Verification Error" });
        await wait(1200);
        setResult({ status: 'invalid-link', message: 'The verification link is missing a certificate ID.' });
        return;
      }

      try {
        await wait(200);
        setLoadingState(prev => ({ ...prev, percent: 25, message: 'Establishing secure connection...' }));
        
        await wait(500);
        setLoadingState(prev => ({ ...prev, percent: 50, message: 'Querying official certificate registry...' }));

        const form = new URLSearchParams();
        form.append('certId', certId.trim());
        
        const response = await fetch(ENDPOINT, { method: 'POST', body: form });
        if (!response.ok) throw new Error(`Network Error: ${response.statusText}`);
        const json = await response.json();

        await wait(800);
        setLoadingState(prev => ({ ...prev, percent: 80, message: 'Validating certificate data...' }));

        await wait(400);
        setLoadingState(prev => ({ ...prev, percent: 100, message: 'Verification complete!' }));
        
        await wait(400);
        if (json && json.status === 'verified' && json.data) {
          setResult({ status: 'verified', data: json.data });
        } else {
          setResult({ status: 'not-found', message: 'No valid record was found for this certificate ID.' });
        }
      } catch (error) {
        console.error("Verification failed:", error);
        setLoadingState(prev => ({ ...prev, percent: 100, message: 'Verification service unavailable' }));
        await wait(1200);
        setResult({ status: 'error', message: 'Could not connect to the verification service. Please try again later.' });
      }
    };
    verifyCertificate();
  }, [searchParams]);

  useEffect(() => {
    if (result.status !== 'verifying') {
      const timer = setTimeout(() => setShowResult(true), 100);
      return () => clearTimeout(timer);
    }
  }, [result.status]);

  if (result.status === 'verifying') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl mx-4"
      >
        <div className="bg-background border border-border rounded-3xl shadow-2xl p-8 md:p-12 backdrop-blur-xl">
          {/* Header with Shield Icon */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center"
              >
                <ShieldCheckIcon className="w-12 h-12 text-primary" />
              </motion.div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-primary/20 border-t-primary rounded-full"
              />
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-3">
            {loadingState.headline}
          </h2>
          
          {/* Progress Message */}
          <p className="text-center text-muted-foreground mb-8 text-lg">
            {loadingState.message}
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden shadow-inner">
            <motion.div 
              className="bg-gradient-to-r from-primary via-primary/80 to-primary h-3 rounded-full relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${loadingState.percent}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>

          {/* Progress Percentage */}
          <div className="text-center mt-4 text-sm font-semibold text-primary">
            {loadingState.percent}% Complete
          </div>

          {/* Security Badge */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>Secure SSL Connection</span>
          </div>
        </div>
      </motion.div>
    );
  }

  const isSuccess = result.status === 'verified';
  const badgeTitle = {
      'verified': 'CERTIFICATE VERIFIED',
      'not-found': 'CERTIFICATE NOT FOUND',
      'invalid-link': 'INVALID VERIFICATION LINK',
      'error': 'VERIFICATION FAILED'
  }[result.status];

  return (
    <AnimatePresence>
      <motion.main 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl mx-4"
      >
        <div className="bg-background border border-border rounded-3xl shadow-2xl p-6 md:p-10 backdrop-blur-xl overflow-hidden">
          
          {/* Header with Logo */}
          <motion.header 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-border"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center bg-primary/10 rounded-2xl border-2 border-primary/20">
                <img src="/persevex.png" alt="Persevex Logo" className="w-12 h-12 rounded-xl object-cover"/>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">Persevex CertiCheck</div>
                <div className="text-sm text-muted-foreground">Official Certificate Verification System</div>
              </div>
            </div>
            <Link 
              href="/" 
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-2 group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </motion.header>

          {/* Verification Badge */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className={`flex items-center justify-center gap-3 font-bold text-base md:text-lg px-6 py-4 rounded-2xl mb-8 w-fit mx-auto shadow-lg ${
              isSuccess 
                ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-2 border-green-500/30' 
                : 'bg-red-500/10 text-red-600 dark:text-red-400 border-2 border-red-500/30'
            }`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              {isSuccess ? <CheckIcon className="w-7 h-7"/> : <CrossIcon className="w-7 h-7"/>}
            </motion.div>
            <span>{badgeTitle}</span>
          </motion.div>

          {/* Certificate Details */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border shadow-inner"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2 text-xs uppercase font-bold text-muted-foreground tracking-wider">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Student Name
                </div>
                <div className="text-xl font-bold text-foreground break-words">
                  {result.data?.studentName ?? '—'}
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2 text-xs uppercase font-bold text-muted-foreground tracking-wider">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  Program / Domain
                </div>
                <div className="text-xl font-bold text-foreground break-words">
                  {result.data?.domain ?? '—'}
                </div>
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2 text-xs uppercase font-bold text-muted-foreground tracking-wider">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Issue Date
                </div>
                <div className="text-xl font-bold text-foreground break-words">
                  {result.data?.issueDate ?? result.message ?? '—'}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Footer Information */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 pt-6 border-t border-border space-y-4"
          >
            <p className="text-center text-sm text-muted-foreground">
              This verification was performed against our official secure certificate registry.
            </p>
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Officially Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>Real-time Database</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.main>
    </AnimatePresence>
  );
}

export default function CertificateVerifier() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <Verifier />
        </Suspense>
    );
}

const LoadingFallback = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-md mx-4 text-center"
    >
        <div className="bg-background border border-border p-12 rounded-3xl shadow-2xl">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full mx-auto mb-6"
            />
            <h2 className="text-2xl font-bold text-foreground mb-2">Loading Verifier...</h2>
            <p className="text-muted-foreground">Please wait while we initialize the verification system.</p>
        </div>
    </motion.div>
);


function ExploreAppbar() {
  return (
    <div className="flex items-start justify-start w-full ">
      <Link href={"/"} className="text-2xl md:text-3xl font-bold">
        PERSEVEX
      </Link>
    </div>
  );
}
