"use client";
import { Copy, Share2 } from 'lucide-react';
import { toast } from 'sonner';
export default function PromptActions({ text }: { text: string }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Prompt copied to clipboard");
    } catch {
      toast.error("Failed to copy prompt");
    }
  };

  const handleShare = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
      <button onClick={handleCopy} className="btn-primary">
        <Copy size={15} />
        Copy Prompt
      </button>
      <button onClick={handleShare} className="btn-secondary">
        <Share2 size={15} />
        Share
      </button>
    </div>
  );
}
