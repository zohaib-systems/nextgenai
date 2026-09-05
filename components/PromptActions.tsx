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
    <button
      onClick={handleCopy}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
        color: '#fff', border: 'none', borderRadius: 50,
        padding: '11px 24px', fontWeight: 700, fontSize: '0.9rem',
        cursor: 'pointer', fontFamily: 'inherit',
        boxShadow: '0 0 20px rgba(139,92,246,0.4)',
        transition: 'all 0.2s ease',
        minHeight: '44px',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 32px rgba(139,92,246,0.6)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(139,92,246,0.4)'; }}
    >
      <Copy size={15} />
      Copy Prompt
    </button>
    <button
      onClick={handleShare}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'rgba(6,182,212,0.12)',
        border: '1px solid rgba(6,182,212,0.3)',
        color: '#67e8f9', borderRadius: 50,
        padding: '11px 24px', fontWeight: 600, fontSize: '0.9rem',
        cursor: 'pointer', fontFamily: 'inherit',
        transition: 'all 0.2s ease',
        minHeight: '44px',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.2)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.12)'; }}
    >
      <Share2 size={15} />
      Share
    </button>
  </div>);
}
