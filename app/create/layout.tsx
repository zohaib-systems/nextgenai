import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create a Prompt — NextGenAI',
  description: 'Publish a new prompt to the NextGenAI library.',
  robots: { index: false, follow: true },
};

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
