"use client";

import dynamic from "next/dynamic";

// Lazy load non-critical UI components
const ChatWidget = dynamic(() => import("./ChatWidget"), {
  ssr: false,
  loading: () => null,
});

const CursorBlob = dynamic(() => import("./CursorBlob"), {
  ssr: false,
  loading: () => null,
});

export default function ClientOnlyComponents() {
  return (
    <>
      <CursorBlob />
      <ChatWidget />
    </>
  );
}
