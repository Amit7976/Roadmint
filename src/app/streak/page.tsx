import { Metadata } from 'next';
import MainContent from './MainContent'


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////


export const metadata: Metadata = {
    title: 'Learning Streaks & Your Progress Report | Roadmint',
    description: 'Track your daily learning streaks, completed topics, and total progress across all roadmaps. Boost consistency and stay motivated to learn more every day.',
  };


//////////////////////////////////////////////////////////////////////////////////////////////////////////

function page() {

    return (
        <div>
            <MainContent />
        </div>
    )
}

export default page