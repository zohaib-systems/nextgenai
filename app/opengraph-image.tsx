import { ImageResponse } from 'next/og';

export const alt = 'NextGenAI — AI Prompt Library';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <div style={{ background: '#06060f', color: '#c4b5fd', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80 }}>
      <div style={{ fontSize: 36 }}>NextGenAI</div>
      <div style={{ fontSize: 80, marginTop: 32 }}>Discover AI Prompt Gems</div>
      <div style={{ fontSize: 28, color: '#9090b8', marginTop: 32 }}>Browse, copy, and share AI prompts.</div>
    </div>, size
  );
}
