import Footer from '@/components/mainUi/Footer';
import Header from '@/components/mainUi/Header';
import MainContent from './MainContent';
import { Metadata } from 'next';


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////


export const metadata: Metadata = {
    title: 'Learning Desk | All Your Roadmaps in One Place | Roadmint',
    description: 'Access all your learning roadmaps and topics in one organized dashboard. Track what you’ve completed and plan what’s next - fast, simple, and personalized.',
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////

function page() {
    return (
        <div className='w-full min-h-screen bg-neutral-900 relative'>
            <Header show={false} />
            <MainContent />
            <Footer />
        </div>
    )
}

export default page