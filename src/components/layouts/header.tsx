'use client';

import { signOut } from '@/actions/auth-actions';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/configs/route.config';
import { cn } from '@/lib/utils';
import { User } from '@supabase/supabase-js';
import { LogOut, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header({ user }: { user: User | null }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const navItems = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Bài viết', href: '/posts' },
    { name: 'Cộng tác viên', href: '/contributors' },
    { name: 'Khóa học', href: '/courses' }
  ];

  return (
    <header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
      <div className='container mx-auto flex h-16 items-center justify-between'>
        <div className='flex items-center justify-between gap-8'>
          <Link href='/' className='text-xl font-bold text-green-500'>
            Choncc
          </Link>
        </div>
        <nav className='hidden gap-6 md:flex'>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-nav rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-green-500 hover:text-white',
                {
                  'bg-green-500 text-white': pathname === item.href
                }
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
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
                    <span className='rounded-md border bg-green-800 px-4 py-2 text-sm font-medium hover:bg-green-600'>
                      {user.user_metadata?.name || user.email?.split('@')[0] || 'User'}
                    </span>
                  </Link>
                  <form action={signOut}>
                    <Button variant='ghost' size='sm' type='submit' title='Đăng xuất'>
                      <LogOut color='red' />
                    </Button>
                  </form>
                </div>
              ) : (
                <Link href={ROUTES.LOGIN}>
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
