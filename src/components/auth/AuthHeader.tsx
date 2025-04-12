import { supabaseServer } from '@/lib/supabase/server';
import Header from '../layouts/header';

export default async function AuthHeader() {
  const supabase = await supabaseServer();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return <Header user={user} />;
}
