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
      className="btn-ghost"
      style={copied ? {
        background: 'rgba(6,182,212,0.15)',
        borderColor: 'rgba(6,182,212,0.35)',
        color: '#67e8f9',
      } : undefined}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}
