import Link from "next/link";
import Image from "next/image";
import CopyPromptButton from "./CopyPromptButton";
import { type Prompt } from "@/lib/supabase";
import PromptActions from "./PromptActions";
import { ArrowLeft, Tag } from "lucide-react";

export default function PromptDetail({ prompt }: { prompt: Prompt }) {


  return (
    <section style={{ minHeight: '100vh', padding: '32px 24px 80px', maxWidth: 1200, margin: '0 auto' }}>
      {/* Back button */}
      <Link href="/library"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(139,92,246,0.1)',
          border: '1px solid rgba(139,92,246,0.2)',
          borderRadius: 50, padding: '8px 20px',
          color: '#a78bfa', fontWeight: 600, fontSize: '0.85rem',
          cursor: 'pointer', marginBottom: 36, fontFamily: 'inherit',
          transition: 'all 0.2s ease',
        }}
      >
        <ArrowLeft size={15} />
        Back to Library
      </Link>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {/* Top: image + info */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-8 items-start">
          {/* Image */}
          <div style={{
            position: 'relative', borderRadius: 20, overflow: 'hidden',
            aspectRatio: '4/3',
            border: '1px solid rgba(139,92,246,0.2)',
            boxShadow: '0 0 40px rgba(139,92,246,0.12), 0 24px 64px rgba(0,0,0,0.5)',
          }}>
            <Image
              src={prompt.image_url.replace(/\[.*\]\((.*)\)/, "$1")}
              alt={prompt.title}
              fill
              className="object-cover"
              preload
              sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1199px) calc((100vw - 80px) / 2.4), 467px"
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom right, transparent 60%, rgba(8,8,20,0.6) 100%)',
            }} />
          </div>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Category */}
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(139,92,246,0.12)',
              border: '1px solid rgba(139,92,246,0.25)',
              borderRadius: 50, padding: '4px 14px',
              fontSize: '0.75rem', color: '#a78bfa', fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase', alignSelf: 'flex-start',
            }}>
              <Tag size={11} />
              {prompt.category}
            </span>

            {/* Title */}
            <h1 style={{
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800,
              margin: 0, lineHeight: 1.2, wordBreak: 'break-word',
              background: 'linear-gradient(135deg, #f0f0ff 0%, #c4b5fd 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              {prompt.title}
            </h1>

            {/* Description */}
            <p style={{ color: '#8888b0', fontSize: '1rem', lineHeight: 1.7, margin: 0, wordBreak: 'break-word' }}>
              {prompt.description}
            </p>

            {/* Action buttons */}
            <PromptActions text={prompt.prompt_text} />
          </div>
        </div>

        {/* Prompt text box */}
        <div style={{
          background: 'rgba(14,14,31,0.8)',
          border: '1px solid rgba(139,92,246,0.2)',
          borderRadius: 20, padding: '28px 32px',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 0 40px rgba(139,92,246,0.06), 0 16px 48px rgba(0,0,0,0.4)',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 20, paddingBottom: 16,
            borderBottom: '1px solid rgba(139,92,246,0.12)',
          }}>
            <h2 style={{ margin: 0, color: '#6666a0', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Prompt Text
            </h2>
            <CopyPromptButton text={prompt.prompt_text} />
          </div>
          <pre style={{
            color: '#d0d0f0', fontSize: '0.9rem', lineHeight: 1.8,
            whiteSpace: 'pre-wrap', wordBreak: 'break-word',
            margin: 0, fontFamily: '"Geist Mono", "Fira Code", monospace',
          }}>
            {prompt.prompt_text}
          </pre>
        </div>
      </div>
    </section>
  );
}
