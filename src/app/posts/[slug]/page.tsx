import { Badge } from '@/components/ui/badge';
import { formatDateWithShortMonth } from '@/lib/utils';
import { Home } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getDetailPost } from '../actions';
import { IPostDetail } from '@/app/interfaces/posts.interface';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostsDetailPage({ params }: PostPageProps) {
  const { slug } = await params;
  const postDetail: IPostDetail = await getDetailPost(slug);

  return (
    <div className='container mx-auto'>
      <div className='text-muted-foreground mt-4 mb-6 flex items-center gap-2 text-sm'>
        <Link href='/' className='hover:text-foreground'>
          <Home className='h-4 w-4' />
        </Link>
        <span>&gt;</span>
        <Link href='/posts' className='hover:text-foreground'>
          Post
        </Link>
        <span>&gt;</span>
        <span className='max-w-[200px] truncate'>{postDetail.title}</span>
      </div>

      <h1 className='mb-4 text-3xl font-bold md:text-4xl'>{postDetail.title}</h1>

      <div className='mb-6 flex flex-wrap gap-4'>
        <div className='text-muted-foreground text-sm'>{formatDateWithShortMonth(postDetail.created_at)}</div>
        {postDetail.category_id && (
          <Badge
            variant='outline'
            className='border-green-500/20 bg-transparent text-xs font-normal text-green-500 hover:bg-green-500/10'
          >
            {postDetail.category_id}
          </Badge>
        )}
      </div>

      {postDetail.featured_image && (
        <div className='relative mb-8 aspect-video overflow-hidden rounded-lg'>
          <Image
            src={postDetail.featured_image || '/placeholder.svg'}
            alt={postDetail.title}
            fill
            className='object-cover'
          />
        </div>
      )}

      <div
        className='prose prose-lg dark:prose-invert mb-12 max-w-none'
        dangerouslySetInnerHTML={{ __html: postDetail.content }}
      />
    </div>
  );
}
