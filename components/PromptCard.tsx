"use client";

import { Copy, Share2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import Image from 'next/image';
import { useState } from 'react';

interface PromptCardProps {
  id: string;
  title: string;
  description: string;
  prompt_text: string;
  image_url: string;
  category: string;
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  Writing: { bg: 'rgba(168,85,247,0.15)', text: '#c084fc' },
  Development: { bg: 'rgba(6,182,212,0.15)', text: '#67e8f9' },
  Marketing: { bg: 'rgba(249,115,22,0.15)', text: '#fb923c' },
  Default: { bg: 'rgba(139,92,246,0.15)', text: '#a78bfa' },
};

export default function PromptCard({
  id, title, description, prompt_text, image_url, category,
}: PromptCardProps) {
  const [hovered, setHovered] = useState(false);

  const colors = categoryColors[category] ?? categoryColors.Default;

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    try {
      await navigator.clipboard.writeText(prompt_text);
      toast.success('Prompt copied!', { duration: 1800 });
    } catch {
      toast.error('Failed to copy prompt');
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    try {
      const url = `${window.location.origin}/prompt/${id}`;
      await navigator.clipboard.writeText(url);
      toast.success('Link copied!', { duration: 1800 });
    } catch {
      toast.error('Failed to copy link');
    }
  };

  return (
    <Link href={`/prompt/${id}`} style={{ textDecoration: 'none' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex', flexDirection: 'column', height: '100%',
          borderRadius: 20,
          background: hovered
            ? 'linear-gradient(145deg, rgba(18,18,40,0.95), rgba(12,12,30,0.95))'
            : 'linear-gradient(145deg, rgba(14,14,31,0.9), rgba(10,10,24,0.9))',
          border: `1px solid ${hovered ? 'rgba(139,92,246,0.45)' : 'rgba(139,92,246,0.14)'}`,
          overflow: 'hidden',
          boxShadow: hovered
            ? '0 0 32px rgba(139,92,246,0.18), 0 20px 60px rgba(0,0,0,0.5)'
            : '0 4px 24px rgba(0,0,0,0.35)',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          backdropFilter: 'blur(12px)',
          cursor: 'pointer',
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
          <Image
            src={image_url.replace(/\[.*\]\((.*)\)/, '$1')}
            alt={title}
            fill
            sizes="(max-width: 639px) calc(100vw - 48px), (max-width: 1023px) calc((100vw - 72px) / 2), (max-width: 1399px) calc((100vw - 96px) / 3), 435px"
            className="object-cover"
            style={{ transition: 'transform 0.4s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
          />
          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 40%, rgba(10,10,24,0.85) 100%)',
          }} />
          {/* Category pill */}
          <span style={{
            position: 'absolute', top: 12, left: 12,
            background: colors.bg,
            color: colors.text,
            border: `1px solid ${colors.text}33`,
            borderRadius: 50, padding: '3px 12px',
            fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase',
            backdropFilter: 'blur(8px)',
          }}>
            {category}
          </span>
        </div>

        {/* Content */}
        <div style={{ padding: '18px 20px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h2 style={{
            fontWeight: 700, fontSize: '1.1rem', color: '#e8e8ff',
            margin: 0, lineHeight: 1.35, wordBreak: 'break-word',
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {title}
          </h2>
          <p style={{
            fontSize: '0.9rem', color: '#7070a0', margin: 0, lineHeight: 1.6, flex: 1, wordBreak: 'break-word',
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {description}
          </p>

          {/* Actions */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginTop: 8, paddingTop: 12,
            borderTop: '1px solid rgba(139,92,246,0.1)',
          }}>
            <span style={{
              display: 'flex', alignItems: 'center', gap: 4,
              fontSize: '0.85rem', color: '#6060a0', fontWeight: 500,
            }}>
              <ArrowRight size={14} />
              View prompt
            </span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                onClick={handleCopy}
                aria-label="Copy prompt text"
                style={{
                  background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)',
                  borderRadius: 8, padding: '8px', cursor: 'pointer',
                  minWidth: '44px', minHeight: '44px',
                  color: '#a78bfa', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.25)'; e.currentTarget.style.color = '#c4b5fd'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.12)'; e.currentTarget.style.color = '#a78bfa'; }}
              >
                <Copy size={16} />
              </button>
              <button
                onClick={handleShare}
                aria-label="Share prompt link"
                style={{
                  background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)',
                  borderRadius: 8, padding: '8px', cursor: 'pointer',
                  minWidth: '44px', minHeight: '44px',
                  color: '#67e8f9', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.22)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.1)'; }}
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
