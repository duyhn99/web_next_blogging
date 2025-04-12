'use client';

import { Button } from '@/components/ui/button';
import useToast from '@/hooks/use-toast';
import React from 'react';

export default function Home() {
  const { toast } = useToast();
  return (
    <div>
      <Button
        onClick={() =>
          toast({
            title: 'Success',
            variant: 'success',
            description: 'Dữ liệu đã được lưu.',
            duration: 3000
          })
        }
      >
        Show Default Toast
      </Button>
    </div>
  );
}
