"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(6,6,15,0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(139,92,246,0.1)',
      boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: 64, maxWidth: 1400, margin: '0 auto',
      }}>
        {/* Logo / badge */}
        <Link href="/" style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'linear-gradient(135deg, rgba(15,10,40,0.9), rgba(22,12,55,0.9))',
            border: '1px solid rgba(139,92,246,0.4)',
            borderRadius: 50, padding: '7px 18px',
            boxShadow: '0 0 18px rgba(139,92,246,0.25), 0 4px 16px rgba(0,0,0,0.4)',
            cursor: 'pointer',
          }}>
            {/* Spark icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <defs>
                <linearGradient id="ig" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a78bfa"/>
                  <stop offset="100%" stopColor="#60a5fa"/>
                </linearGradient>
              </defs>
              <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="url(#ig)"/>
              <path d="M19 16L19.75 18.25L22 19L19.75 19.75L19 22L18.25 19.75L16 19L18.25 18.25L19 16Z" fill="#a78bfa" opacity="0.8"/>
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <span style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.7)' }}>
                Next Gen
              </span>
              <span style={{
                fontSize: '16px', fontWeight: 800, letterSpacing: '0.05em',
                background: 'linear-gradient(90deg, #c4b5fd, #93c5fd, #67e8f9)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                AI
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav links */}
        <div className="hidden md:flex items-center gap-6">
          {[
            { label: 'Home', href: '/' },
            { label: 'Library', href: '/library' },
          ].map(({ label, href }) => (
            <Link key={href} href={href} style={{ textDecoration: 'none' }}>
              <span className="inline-block px-[14px] py-[6px] rounded-full text-[0.88rem] font-medium text-[#8888b0] transition-all duration-200 hover:text-[#c4b5fd] hover:bg-violet-500/10 min-w-[44px] min-h-[44px] flex items-center justify-center">
                {label}
              </span>
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden flex items-center justify-center p-2 text-[#8888b0] hover:text-[#c4b5fd] focus:outline-none min-w-[44px] min-h-[44px]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div id="mobile-navigation" className="md:hidden border-t border-violet-500/10 bg-[#06060f]/95 backdrop-blur-xl">
          <div className="flex flex-col px-4 py-4 space-y-2">
            {[
              { label: 'Home', href: '/' },
              { label: 'Library', href: '/library' },
            ].map(({ label, href }) => (
              <Link key={href} href={href} style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>
                <span className="block px-4 py-3 rounded-xl text-[1rem] font-medium text-[#8888b0] transition-all duration-200 hover:text-[#c4b5fd] hover:bg-violet-500/10 active:bg-violet-500/20 w-full min-h-[44px] flex items-center">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
