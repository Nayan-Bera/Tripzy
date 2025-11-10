import { useEffect, useRef, useState } from 'react';

// Get the site key from environment variables
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';

// Declare grecaptcha type
declare global {
  interface Window {
    grecaptcha: any;
    onRecaptchaLoad: () => void;
  }
}

export function AutoRecaptcha() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recaptchaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip if no valid site key
    if (!RECAPTCHA_SITE_KEY || RECAPTCHA_SITE_KEY === 'your_recaptcha_site_key_here') {
      console.warn('⚠️ ReCaptcha disabled: No valid site key provided. Add VITE_RECAPTCHA_SITE_KEY to your .env file');
      return;
    }

    // Load ReCaptcha script
    const loadRecaptchaScript = () => {
      // Check if script already exists
      if (document.querySelector('script[src*="recaptcha"]')) {
        checkRecaptchaReady();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        checkRecaptchaReady();
      };
      
      script.onerror = () => {
        setError('Failed to load ReCaptcha script');
        console.error('Failed to load ReCaptcha script');
      };

      document.head.appendChild(script);
    };

    // Check if ReCaptcha is ready
    const checkRecaptchaReady = () => {
      const checkInterval = setInterval(() => {
        if (window.grecaptcha && window.grecaptcha.ready) {
          clearInterval(checkInterval);
          window.grecaptcha.ready(() => {
            setIsReady(true);
            executeRecaptcha();
          });
        }
      }, 100);

      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        if (!isReady) {
          console.warn('ReCaptcha failed to load within timeout');
        }
      }, 10000);
    };

    // Execute ReCaptcha
    const executeRecaptcha = async () => {
      try {
        if (!window.grecaptcha || !window.grecaptcha.execute) {
          console.log('Execute recaptcha not yet available');
          return;
        }

        const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { 
          action: 'submit' 
        });
        
        console.log('✅ ReCaptcha token generated successfully');
        
        // You can store the token or dispatch it to your form
        // Example: localStorage.setItem('recaptcha_token', token);
        // Or dispatch to Redux/Context
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        console.error('ReCaptcha verification error:', err);
      }
    };

    loadRecaptchaScript();

    // Cleanup
    return () => {
      setIsReady(false);
      setError(null);
    };
  }, []);

  // Don't render anything if no valid key (silent failure for development)
  if (!RECAPTCHA_SITE_KEY || RECAPTCHA_SITE_KEY === 'your_recaptcha_site_key_here') {
    return null;
  }

  // Optional: Show error in development mode
  if (error && import.meta.env.DEV) {
    return (
      <div style={{ 
        padding: '10px', 
        backgroundColor: '#fff3cd', 
        border: '1px solid #ffc107',
        borderRadius: '4px',
        margin: '10px 0',
        fontSize: '14px'
      }}>
        ⚠️ ReCaptcha Error: {error}
      </div>
    );
  }

  return (
    <div ref={recaptchaRef} className="recaptcha-container">
      {/* ReCaptcha badge will be automatically inserted here */}
    </div>
  );
}