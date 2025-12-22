'use client';

import Script from 'next/script';

export default function MonnifyScript() {
  return (
    <Script
      src="https://sdk.monnify.com/v1/monnify.js"
      strategy="afterInteractive"
      onLoad={() => {
        window.dispatchEvent(new Event('monnify-sdk-loaded'));
      }}
    />
  );
}
