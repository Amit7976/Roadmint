import Image from 'next/image'
import Link from 'next/link'


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

function Logo() {
    return (
        <>
            <Link className="text-2xl text-white font-semibold tracking-wide flex items-center w-fit" href="/" aria-label="Roadmint">
                <Image src={'/images/logo.png'} width={50} height={50} alt='Logo' className='w-10 mt-0.5' />
                Road
                <span className='text-[#60ff1c]'>m</span>
                <span className='text-[#ff708f]'>i</span>
                <span className='text-[#ffd86c]'>n</span>
                <span className='text-[#e97cff]'>t</span>
            </Link>
        </>
    )
}

export default Logo