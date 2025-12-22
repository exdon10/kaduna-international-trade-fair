"use client";

import { useState, useEffect, useCallback } from "react";

declare global {
  interface Window {
    MonnifySDK: {
      initialize: (options: MonnifyOptions) => void;
    };
  }
}

type MonnifyOptions = {
  amount: number;
  currency: string;
  reference: string;
  customerFullName: string;
  customerEmail: string;
  apiKey: string;
  contractCode: string;
  paymentDescription: string;
  isTestMode?: boolean;
  onComplete: (response: any) => void;
  onClose: () => void;
  paymentMethods?: ("CARD" | "ACCOUNT_TRANSFER")[];
};

type UseMonnifyPaymentProps = {
    amount: number;
    currency: string;
    description: string;
    customerFullName: string;
    customerEmail: string;
    paymentReference: string;
    onComplete: (response: any) => void;
    onClose: () => void;
};


// The contract code is often the same as the API key in test mode for monnify
// but it's good practice to have it as a separate variable.
const MONNIFY_CONTRACT_CODE = process.env.NEXT_PUBLIC_MONNIFY_API_KEY!;

export const useMonnifyPayment = (props: UseMonnifyPaymentProps) => {
  const [isSdkReady, setIsSdkReady] = useState(false);

  useEffect(() => {
    const handleSdkLoad = () => {
      setIsSdkReady(true);
    };

    // Check if the SDK is already available
    if (typeof window.MonnifySDK !== 'undefined') {
      handleSdkLoad();
    } else {
      // Otherwise, listen for the custom event
      window.addEventListener('monnify-sdk-loaded', handleSdkLoad);
    }

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('monnify-sdk-loaded', handleSdkLoad);
    };
  }, []);

  const initializePayment = useCallback(() => {
    if (!process.env.NEXT_PUBLIC_MONNIFY_API_KEY) {
        console.error("Monnify API key is not set.");
        alert("Payment gateway is not configured.");
        return;
    }
      
    if (!isSdkReady || typeof window.MonnifySDK === 'undefined') {
        console.error("Monnify SDK is not loaded");
        alert("Payment gateway is not available at the moment. Please try again later.");
        return;
    }
    
    const monnifyOptions: MonnifyOptions = {
      amount: props.amount,
      currency: props.currency,
      reference: props.paymentReference,
      customerFullName: props.customerFullName,
      customerEmail: props.customerEmail,
      apiKey: process.env.NEXT_PUBLIC_MONNIFY_API_KEY,
      contractCode: MONNIFY_CONTRACT_CODE, 
      paymentDescription: props.description,
      isTestMode: true,
      onComplete: (response) => {
        props.onComplete(response);
      },
      onClose: () => {
        props.onClose();
      },
      paymentMethods: ["CARD", "ACCOUNT_TRANSFER"],
    };

    try {
      window.MonnifySDK.initialize(monnifyOptions);
    } catch (error) {
      console.error("Failed to initialize Monnify SDK", error);
      alert("Could not initiate payment. Please try again.");
    }
  }, [isSdkReady, props]);

  return { initializePayment, isInitializing: !isSdkReady };
};
