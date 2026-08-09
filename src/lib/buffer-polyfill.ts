import { Buffer as BufferPolyfill } from "buffer/";

const g = globalThis as unknown as { Buffer?: unknown };
if (typeof g.Buffer === "undefined") {
  g.Buffer = BufferPolyfill;
}

export {};
