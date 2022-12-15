declare global {
    interface Window {
      initMap: () => void;
    }
  }
  window.initMap = initMap;
  export {};