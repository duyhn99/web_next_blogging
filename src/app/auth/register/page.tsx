'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

const formSchema = z
  .object({
    name: z.string().nonempty({ message: 'Vui lòng nhập họ tên' }),
    email: z
      .string()
      .nonempty({ message: 'Vui lòng nhập địa chỉ email' })
      .email({ message: 'Địa chỉ email không hợp lệ' }),
    password: z
      .string()
      .nonempty({ message: 'Vui lòng nhập mật khẩu' })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/gm, {
        message: 'Mật khẩu phải có ít nhat 8 kí tự, bao gồm ít nhất 1 chữ hoa, 1 số'
      }),
    confirmPassword: z.string().nonempty({ message: 'Vui lòng nhập mật khẩu' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword']
  });

export default function RegisterPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    },
    mode: 'all'
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleRegister = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const supabase = supabaseClient();
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        toast({
          title: 'Đăng ký thất bại',
          description: error.message || 'Đã có lỗi xảy ra khi đăng ký.',
          variant: 'error'
        });
      } else {
        alert('Đăng ký thành công! Vui lòng kiểm tra email để xác minh.');
        router.push(ROUTES.LOGIN);
      }
    } catch (error: any) {
      toast({
        title: 'Đăng ký thất bại',
        description: error.message || 'Đã có lỗi xảy ra khi đăng ký.',
        variant: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='from-background to-muted/20 flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-b'>
      <div className='w-full max-w-md p-4'>
        <div className='mb-8 text-center'>
          <Link href='/' className='text-3xl font-bold text-green-500'>
            200Lab
          </Link>
        </div>
        <Card className='bg-card border-none backdrop-blur-sm'>
          <CardHeader>
            <CardTitle className='text-center text-xl'>Đăng ký tài khoản</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleRegister)} className='space-y-4'>
                <FormField
                  control={form.control}
                  name='name'
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ và tên</FormLabel>
                      <FormControl>
                        <Input placeholder='Nhập họ tên của bạn' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                      <FormLabel>Mật khẩu</FormLabel>
                      <FormControl>
                        <InputPassword placeholder='Nhập mật khẩu' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='confirmPassword'
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Xác nhận mật khẩu</FormLabel>
                      <FormControl>
                        <InputPassword placeholder='Nhập lại mật khẩu' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit' className='w-full bg-green-500 hover:bg-green-600' disabled={isLoading}>
                  {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
                </Button>
                <div className='text-center text-sm'>
                  <span className='text-muted-foreground'>Đã có tài khoản? </span>
                  <Link href={ROUTES.LOGIN} className='text-green-500 hover:text-green-400'>
                    Đăng nhập
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
