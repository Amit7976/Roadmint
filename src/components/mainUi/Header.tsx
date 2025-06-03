import Logo from '@/components/mainUi/Logo';
import { HeaderProps } from '@/utils/types';
import Link from 'next/link';
import StreakDisplay from './streakTracker';


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////


function Header({ show = true }: HeaderProps) {
  return (
    <div>
      <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm">
        <nav className="mt-3 relative w-full px-4 lg:py-4 lg:px-8">
          <div className='flex items-center justify-between gap-10'>
            <Logo />

            {show ?
              <Link href={'/desk'} className='text-gray-300 font-semibold lg:font-medium bg-neutral-800 hover:bg-neutral-900 hover:text-white border-2 border-neutral-700 duration-300 px-5 lg:px-10 py-2 lg:py-2.5 rounded-sm hover:-translate-y-0.5 active:scale-95'>
                Your Desk
              </Link>
              :
              <StreakDisplay />
            }

          </div>
        </nav>
      </header>
    </div>
  )
}

export default Header
