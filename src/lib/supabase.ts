import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface MembershipApplication {
  full_name: string;
  email: string;
  phone: string;
  country_of_residence: string;
  preferred_language: string;
  age_range: string;
  property_status: string;
  visit_frequency: string;
  heard_about_us: string;
  interests: string[];
  preferred_benefits: string[];
  wishes: string;
}

export async function submitApplication(data: MembershipApplication) {
  const { error } = await supabase
    .from('membership_applications')
    .insert(data);

  if (error) throw error;
  return true;
}

export async function getSpotsRemaining(): Promise<{ remaining: number; total: number }> {
  const { data, error } = await supabase
    .from('spots_counter')
    .select('remaining, total')
    .eq('id', 1)
    .maybeSingle();

  if (error) throw error;
  return data ?? { remaining: 444, total: 444 };
}
