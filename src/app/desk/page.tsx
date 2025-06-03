import Footer from '@/components/mainUi/Footer';
import Header from '@/components/mainUi/Header';
import MainContent from './MainContent';


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////


export async function generateMetadata() {
    return {
        title: 'Your Personalized Learning Desk',
        description: 'Manage all your learning roadmaps in one place. Track your progress, stay motivated, and continue your journey across multiple subjects with ease.',
    };
}

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