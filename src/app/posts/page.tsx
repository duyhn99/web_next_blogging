'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { IPosts } from '../interfaces/posts.interface';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function PostsPage() {
  const [posts, setPosts] = useState<IPosts[]>([]);
  const fetchPosts = async () => {
    const supabase = await createClient();

    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    if (data && data.length > 0) setPosts(data);
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className='container mx-auto py-8'>
      <h1 className='mb-8 text-4xl font-bold'>Blog</h1>
      <div className='grid gap-x-8 gap-y-16 md:grid-cols-2'>
        {posts.map((post) => (
          <div key={post.id} className='group'>
            <Link href={`/posts/${post.slug}`} className='block'>
              <h2 className='mb-2 text-xl font-semibold transition-colors group-hover:text-green-500'>{post.title}</h2>
            </Link>

            {post.category_id && (
              <Badge
                variant='outline'
                className='border-green-500/20 bg-transparent text-xs font-normal text-green-500 hover:bg-green-500/10'
              >
                {post.category_id}
              </Badge>
            )}
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className='bg-muted/30 rounded-lg py-12 text-center'>
          <p className='text-muted-foreground'>Không có bài viết nào trong danh mục này</p>
        </div>
      )}
    </div>
  );
}
