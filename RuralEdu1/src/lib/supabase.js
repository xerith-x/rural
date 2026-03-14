/**
 * Supabase client
 *
 * Set these two environment variables in .env.local (never commit that file):
 *
 *   VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
 *   VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
 *
 * See SUPABASE.md for the full integration guide.
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[RuralEdu] Supabase env vars are not set. ' +
      'Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local. ' +
      'See RuralEdu1/SUPABASE.md for instructions.',
  );
}

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
