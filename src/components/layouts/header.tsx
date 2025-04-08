'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useSupabase } from '@/contexts/supabase-provider';
import { ThemeSwitcher } from '@/components/theme-switcher';

export default function Header() {
  const pathname = usePathname();
  const { supabase, user } = useSupabase();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const navItems = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Bài viết', href: '/posts' },
    { name: 'Cộng tác viên', href: '/contributors' },
    { name: 'Khóa học', href: '/courses' }
  ];

  return (
    <header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
      <div className='container flex h-16 items-center justify-between'>
        <div className='flex items-center gap-8'>
          <Link href='/' className='text-xl font-bold text-green-500'>
            Choncc
          </Link>
          <nav className='hidden gap-6 md:flex'>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'hover:text-primary text-sm font-medium transition-colors',
                  pathname === item.href ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='ghost' size='icon' className='text-muted-foreground'>
            <Search className='h-5 w-5' />
          </Button>
          <ThemeSwitcher />
          {!isLoading && (
            <>
              {user ? (
                <div className='flex items-center gap-2'>
                  <Link href='/dashboard'>
                    <Button variant='ghost' size='sm'>
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant='ghost' size='sm' onClick={handleSignOut}>
                    Đăng xuất
                  </Button>
                </div>
              ) : (
                <Link href='/login'>
                  <Button className='bg-green-500 text-white hover:bg-green-600'>Đăng nhập</Button>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
