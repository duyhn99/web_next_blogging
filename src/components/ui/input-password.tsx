import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

interface InputPasswordProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  placeholder?: string;
}

export function InputPassword({ value, onChange, name, placeholder }: InputPasswordProps) {
  const [show, setShow] = useState(false);

  return (
    <div className='relative'>
      <Input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder || 'Nhập mật khẩu'}
      />
      <Button
        type='button'
        variant='ghost'
        size='icon'
        onClick={() => setShow(!show)}
        className='absolute top-1/2 right-2 -translate-y-1/2'
      >
        {show ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
      </Button>
    </div>
  );
}
