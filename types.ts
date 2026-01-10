export interface LenisInstance {
  raf: (time: number) => void;
  destroy: () => void;
  on: (event: string, callback: (args: any) => void) => void;
}

declare global {
  interface Window {
    Lenis: new (options?: any) => LenisInstance;
  }
}
