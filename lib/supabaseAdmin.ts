import 'server-only';
import { createClient } from '@supabase/supabase-js';

// Server‑side Supabase client using Service Role key (never exposed to client)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
);
