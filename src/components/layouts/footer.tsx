import Link from 'next/link';
import { ThemeSwitcher } from '@/components/theme-switcher';

export default function Footer() {
  return (
    <footer className='bg-footer-bg mt-12 border-t py-8'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
          <div className='space-y-4'>
            <Link href='/' className='text-xl font-bold text-green-500'>
              Choncc Blog
            </Link>
            <p className='text-muted-foreground'>
              Nền tảng chia sẻ kiến thức lập trình và công nghệ hàng đầu Việt Nam.
            </p>
            <div className='flex items-center gap-2'>
              <span className='text-muted-foreground text-sm'>Giao diện:</span>
              <ThemeSwitcher />
            </div>
          </div>

          <div>
            <h3 className='mb-4 font-medium'>Liên kết</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='/' className='text-muted-foreground hover:text-foreground transition-colors'>
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href='/posts' className='text-muted-foreground hover:text-foreground transition-colors'>
                  Bài viết
                </Link>
              </li>
              <li>
                <Link href='/contributors' className='text-muted-foreground hover:text-foreground transition-colors'>
                  Cộng tác viên
                </Link>
              </li>
              <li>
                <Link href='/courses' className='text-muted-foreground hover:text-foreground transition-colors'>
                  Khóa học
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='mb-4 font-medium'>Chủ đề</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/categories/web-development'
                  className='text-muted-foreground hover:text-foreground transition-colors'
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href='/categories/mobile-development'
                  className='text-muted-foreground hover:text-foreground transition-colors'
                >
                  Mobile Development
                </Link>
              </li>
              <li>
                <Link
                  href='/categories/devops'
                  className='text-muted-foreground hover:text-foreground transition-colors'
                >
                  DevOps
                </Link>
              </li>
              <li>
                <Link
                  href='/categories/data-science'
                  className='text-muted-foreground hover:text-foreground transition-colors'
                >
                  Data Science
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='mb-4 font-medium'>Liên hệ</h3>
            <address className='text-muted-foreground not-italic'>
              <p>Email: contact@Choncc.io</p>
              <p>Địa chỉ: Cần Thơ, Việt Nam</p>
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
}
