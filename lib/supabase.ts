import 'server-only';
import { cache } from 'react';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
);

export interface Prompt {
  id: string;
  title: string;
  description: string;
  prompt_text: string;
  image_url: string;
  category: string;
  tags: string[];
  created_at: string;
}

export const getLatestPrompts = async (limit = 6): Promise<Prompt[]> => {
  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) {
    console.error('Supabase getLatestPrompts error:', error);
    throw new Error('Unable to load recent prompts');
  }
  return data ?? [];
};

export const getAllPrompts = async (): Promise<Prompt[]> => {
  const { data, error } = await supabase.from('prompts').select('*');
  if (error) {
    console.error('Supabase getAllPrompts error:', error);
    throw new Error('Unable to load the prompt library');
  }
  return data ?? [];
};

export const searchPrompts = async (query: string): Promise<Prompt[]> => {
  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`);
  if (error) {
    console.error('Supabase searchPrompts error:', error);
    return [];
  }
  return data ?? [];
};

export const getPromptById = cache(async (id: string): Promise<Prompt | null> => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    console.warn('Invalid UUID for getPromptById:', id);
    return null;
  }
  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) {
    console.error('Supabase getPromptById error:', error.message);
    throw new Error('Unable to load this prompt');
  }
  return data ?? null;
});
