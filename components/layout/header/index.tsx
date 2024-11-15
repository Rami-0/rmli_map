import LocaleSwitcher from '@/components/shared/locale-switcher';
import Container from '@/components/ui/container';

export default function Header() {
  return (
    <header className='w-full bg-[#111] text-white'>
      <Container className='mx-auto w-full max-w-[1280px] px-4'>
        <div className='flex items-center justify-between py-4'>
          <div className='flex items-center'>
            <span className='ml-2 font-semibold'>Next.js Starter</span>
          </div>
          <nav>
            <ul className='flex space-x-4'>
              <li>
                <a href='/' className='hover:underline'>
                  Home
                </a>
              </li>
              <li>
                <a href='/example' className='hover:underline'>
                  example
                </a>
              </li>
            </ul>
          </nav>
          <span>
            <LocaleSwitcher />
          </span>
        </div>
      </Container>
    </header>
  );
}
