import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing env variables SUPABASE_URL and/or SUPABASE_ANON_KEY')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase;