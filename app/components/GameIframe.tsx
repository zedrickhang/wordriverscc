'use client';

import { useEffect, useRef } from 'react';
import { setupGameBridge, trackEvent } from '../lib/gameBridge';

interface GameIframeProps {
  src: string;
  onLoad?: () => void;
  title?: string;
  className?: string;
}

export default function GameIframe({ src, onLoad, title, className }: GameIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Setup communication bridge with the game
    setupGameBridge();
    
    // Track when iframe loads
    const handleLoad = () => {
      console.log('Game iframe loaded');
      if (onLoad) {
        onLoad();
      }
    };
    
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleLoad);
    }
    
    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleLoad);
      }
    };
  }, [onLoad]);

  return (
    <iframe
      ref={iframeRef}
      src={`${src}?utm_source=wordrivers.com`}
      className={className || "game-iframe"}
      allowFullScreen
      loading="eager"
      title={title || "Word Rivers Game"}
    />
  );
}