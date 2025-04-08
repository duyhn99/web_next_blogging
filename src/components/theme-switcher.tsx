'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Moon, Sun, Laptop } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Đảm bảo component chỉ render ở client side để tránh hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, [theme]);

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='text-muted-foreground'>
          {theme === 'dark' ? <Moon className='h-5 w-5' /> : <Sun className='h-5 w-5' />}
          <span className='sr-only'>Chuyển đổi giao diện</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          onClick={() => {
            setTheme('light');
          }}
          className='flex cursor-pointer items-center gap-2'
        >
          <Sun className='h-4 w-4' />
          <span>Sáng</span>
          {theme === 'light' && <span className='ml-auto'>✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme('dark');
          }}
          className='flex cursor-pointer items-center gap-2'
        >
          <Moon className='h-4 w-4' />
          <span>Tối</span>
          {theme === 'dark' && <span className='ml-auto'>✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme('system');
          }}
          className='flex cursor-pointer items-center gap-2'
        >
          <Laptop className='h-4 w-4' />
          <span>Hệ thống</span>
          {theme === 'system' && <span className='ml-auto'>✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
