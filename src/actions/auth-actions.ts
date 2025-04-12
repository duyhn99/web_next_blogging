'use server';

import { ROUTES } from '@/configs/route.config';
import { supabaseServer } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function signOut() {
  const supabase = await supabaseServer();
  await supabase.auth.signOut();
  redirect(ROUTES.LOGIN);
}
