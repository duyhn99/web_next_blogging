'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputPassword } from '@/components/ui/input-password';
import { ROUTES } from '@/configs/route.config';
import useToast from '@/hooks/use-toast';
import { supabaseClient } from '@/lib/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  email: z
    .string()
    .nonempty({ message: 'Vui lòng nhập địa chỉ email' })
    .email({ message: 'Địa chỉ email không hợp lệ' }),
  password: z.string().nonempty({ message: 'Vui lòng nhập mật khẩu' })
  // .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/gm, {
  //   message: 'Mật khẩu phải có ít nhat 8 kí tự, bao gồm ít nhất 1 chữ hoa, 1 số'
  // })
});

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'all'
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const supabase = supabaseClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password
      });
      if (error) {
        toast({
          variant: 'error',
          title: 'Lỗi',
          description: error.message
        });
      } else {
        router.push(ROUTES.HOME);
      }
    } catch (error: any) {
      toast({
        variant: 'error',
        title: 'Lỗi',
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='from-background to-muted/20 flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-b'>
      <div className='w-full max-w-md p-4'>
        <div className='mb-8 text-center'>
          <Link href='/' className='text-3xl font-bold text-green-500'>
            Blog
          </Link>
        </div>

        <Card className='bg-card border-none backdrop-blur-sm'>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='bg-login min2sm:w-[424px] mx-auto flex h-[fit] w-full flex-col gap-4 rounded-[24px]'
              >
                <FormField
                  control={form.control}
                  name='email'
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder='Nhập email của bạn' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <InputPassword placeholder='Nhập mật khẩu' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='text-right'>
                  <Link
                    href={ROUTES.FORGOT_PASSWORD}
                    className='text-muted-foreground hover:text-foreground text-sm underline'
                  >
                    Quên mật khẩu
                  </Link>
                </div>
                <Button
                  className='mx-auto w-[200px] bg-green-500 hover:bg-green-400'
                  disabled={isLoading}
                  type='submit'
                >
                  {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </Button>
                <div className='text-center text-sm'>
                  <span className='text-muted-foreground'>Bạn chưa có tài khoản? </span>
                  <Link href='/register' className='text-green-500 hover:text-green-400'>
                    Đăng ký
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
