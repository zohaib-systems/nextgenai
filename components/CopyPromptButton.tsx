"use client";

import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

type Props = { text: string };

export default function CopyPromptButton({ text }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Prompt copied to clipboard!");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy prompt");
    }
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: copied ? 'rgba(6,182,212,0.15)' : 'rgba(139,92,246,0.12)',
        border: `1px solid ${copied ? 'rgba(6,182,212,0.35)' : 'rgba(139,92,246,0.25)'}`,
        color: copied ? '#67e8f9' : '#a78bfa',
        borderRadius: 8, padding: '6px 14px',
        minHeight: 44,
        fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
        fontFamily: 'inherit', transition: 'all 0.2s ease',
      }}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}
