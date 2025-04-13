import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { supabaseServer } from '@/lib/supabase/server';
import Image from 'next/image';
import Link from 'next/link';
import noPicture from '@/assets/images/no-pictures.png';
import { ROUTES } from '@/configs/route.config';

async function getFeaturedPost() {
  const supabase = await supabaseServer();

  const { data } = await supabase
    .from('posts')
    .select(
      `
      id,
      title,
      slug,
      excerpt,
      featured_image,
      created_at,
      users (
        full_name
      )
    `
    )
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  return data;
}

async function getRecentPosts() {
  const supabase = await supabaseServer();

  const { data } = await supabase
    .from('posts')
    .select(
      `
      id,
      title,
      slug,
      excerpt,
      featured_image,
      created_at,
      users (
        full_name
      )
    `
    )
    .eq('published', true)
    .order('created_at', { ascending: false })
    .range(1, 6);

  return data || [];
}

export default async function Home() {
  const featuredPost = await getFeaturedPost();
  const recentPosts = await getRecentPosts();

  return (
    <div className='container py-8'>
      {featuredPost && (
        <div className='bg-muted/30 mb-12 overflow-hidden rounded-xl'>
          <div className='grid gap-6 p-6 md:grid-cols-2'>
            <div className='space-y-4'>
              <h1 className='text-3xl font-bold'>{featuredPost.title}</h1>
              <p className='text-muted-foreground'>{featuredPost.excerpt}</p>
              <Button asChild className='bg-green-500 hover:bg-green-600'>
                <Link href={`/posts/${featuredPost.slug}`}>Tìm hiểu ngay</Link>
              </Button>
            </div>
            <div className='relative aspect-video overflow-hidden rounded-lg'>
              <Image
                src={featuredPost.featured_image || noPicture}
                alt={featuredPost.title}
                fill
                priority
                className='object-cover'
              />
            </div>
          </div>
        </div>
      )}

      <div className='mb-8'>
        <div className='mb-6 flex items-center gap-2'>
          <div className='h-6 w-6 rounded-full bg-green-500'></div>
          <h2 className='text-2xl font-bold'>200Lab Posts</h2>
        </div>

        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {recentPosts.map((post) => (
            <Card key={post.id} className='overflow-hidden'>
              <div className='relative aspect-video'>
                <Image src={post.featured_image || noPicture} alt={post.title} fill className='object-cover' />
              </div>
              <CardContent className='p-4'>
                <Link href={`${ROUTES.POSTS}/${post.slug}`}>
                  <h3 className='line-clamp-2 text-lg font-semibold transition-colors hover:text-green-500'>
                    {post.title}
                  </h3>
                </Link>
                <p className='text-muted-foreground mt-2 line-clamp-3 text-sm'>{post.excerpt}</p>
              </CardContent>
              <CardFooter className='text-muted-foreground p-4 pt-0 text-sm'>
                {new Date(post.created_at).toLocaleDateString('vi-VN')}
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className='mt-8 flex justify-center'>
          <Button variant='outline' asChild>
            <Link href={ROUTES.POSTS}>Xem thêm</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
