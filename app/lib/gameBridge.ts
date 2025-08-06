// Game Bridge for handling communication with the iframe
export const runtime = "edge";
// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

type GameEvent = {
  type: string;
  data?: any;
};

export const setupGameBridge = () => {
  if (typeof window === 'undefined') return;

  // Listen for messages from the game iframe
  window.addEventListener('message', (event) => {
    // Verify the origin of the message
    if (event.origin !== 'https://html5.gamedistribution.com') return;

    try {
      const gameEvent: GameEvent = event.data;
      
      switch (gameEvent.type) {
        case 'riverCleared':
          // Track when a river/level is completed
          trackEvent('word_chain_complete', { level: gameEvent.data?.level || 1 });
          break;
          
        case 'gameLoaded':
          // Track when the game is fully loaded
          trackEvent('game_start');
          break;
          
        default:
          // Handle other events if needed
          break;
      }
    } catch (error) {
      console.error('Error processing game message:', error);
    }
  });
};

// Simple analytics tracking function
export const trackEvent = (eventName: string, payload: Record<string, any> = {}) => {
  // In a real implementation, this would send to your analytics provider
  console.log(`[Analytics] ${eventName}`, payload);
  
  // Example implementation for a real analytics service
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, payload);
  }
};