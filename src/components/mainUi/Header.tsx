import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


type HeaderProps = {
  show?: boolean; // <-- optional!
};

function Header({ show = true }: HeaderProps) {
  return (
    <div>
      {/* ========== HEADER ========== */}
      <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm">
        <nav className="mt-4 relative w-full py-4 px-8">
          <div className='flex items-center justify-between gap-10'>
            <Link className="text-2xl text-white font-medium flex items-center w-fit" href="/" aria-label="Roadmint">
              <Image src={'/images/logo.png'} width={50} height={50} alt='Logo' className='w-10' />
              Road
              <span className='text-[#60ff1c]'>m</span>
              <span className='text-[#ff708f]'>i</span>
              <span className='text-[#ffd86c]'>n</span>
              <span className='text-[#e97cff]'>t</span>
            </Link>
            {show &&
              <Link href={'/desk'} className='text-white font-medium bg-neutral-800 hover:bg-neutral-900 hover:text-white border-2 border-neutral-700 duration-300 px-10 py-2.5 rounded-sm'>
                Your Desk
              </Link>
            }
          </div>
        </nav>
      </header>
      {/* ========== END HEADER ========== */}
    </div>
  )
}

export default Header
