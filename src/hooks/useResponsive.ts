// useResponsive.ts - Complete responsive hooks library

import { useState, useEffect, useCallback } from 'react';

// Device types
export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'tv' | 'watch';
export type Orientation = 'portrait' | 'landscape';
export type OS = 'ios' | 'android' | 'windows' | 'macos' | 'linux' | 'tvos' | 'unknown';

// Main responsive hook
export const useResponsive = () => {
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [orientation, setOrientation] = useState<Orientation>('portrait');
  const [os, setOS] = useState<OS>('unknown');
  const [isTouch, setIsTouch] = useState(false);
  const [pixelRatio, setPixelRatio] = useState(1);
  const [safeArea, setSafeArea] = useState({ top: 0, bottom: 0, left: 0, right: 0 });
  
  useEffect(() => {
    const detect = () => {
      const width = window.innerWidth;
      const ua = navigator.userAgent.toLowerCase();
      
      // Device detection
      if (ua.includes('watch') || width < 200) setDevice('watch');
      else if (ua.includes('tv') || ua.includes('smart-tv')) setDevice('tv');
      else if (width < 768) setDevice('mobile');
      else if (width < 1024) setDevice('tablet');
      else setDevice('desktop');
      
      // Orientation
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
      
      // OS detection
      if (ua.includes('iphone') || ua.includes('ipad')) setOS('ios');
      else if (ua.includes('android')) setOS('android');
      else if (ua.includes('win')) setOS('windows');
      else if (ua.includes('mac')) setOS('macos');
      else if (ua.includes('linux')) setOS('linux');
      else if (ua.includes('tvos')) setOS('tvos');
      
      // Touch detection
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
      
      // Pixel ratio
      setPixelRatio(window.devicePixelRatio || 1);
      
      // Safe area (iOS)
      const computed = getComputedStyle(document.documentElement);
      setSafeArea({
        top: parseInt(computed.getPropertyValue('env(safe-area-inset-top)')) || 0,
        bottom: parseInt(computed.getPropertyValue('env(safe-area-inset-bottom)')) || 0,
        left: parseInt(computed.getPropertyValue('env(safe-area-inset-left)')) || 0,
        right: parseInt(computed.getPropertyValue('env(safe-area-inset-right)')) || 0
      });
    };
    
    detect();
    window.addEventListener('resize', detect);
    window.addEventListener('orientationchange', detect);
    
    return () => {
      window.removeEventListener('resize', detect);
      window.removeEventListener('orientationchange', detect);
    };
  }, []);
  
  return { device, orientation, os, isTouch, pixelRatio, safeArea };
};

// Responsive size hook
export const useResponsiveSize = () => {
  const { device } = useResponsive();
  
  const getSize = useCallback((sizes: Record<DeviceType, number | string>) => {
    return sizes[device];
  }, [device]);
  
  return { getSize };
};

// Responsive grid hook
export const useResponsiveGrid = (cols: Record<DeviceType, number>) => {
  const { device } = useResponsive();
  return cols[device];
};

// Media query hook
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);
  
  return matches;
};

// Viewport hook
export const useViewport = () => {
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });
  
  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return viewport;
};
