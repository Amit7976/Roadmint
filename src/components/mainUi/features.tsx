import { cn } from "@/lib/utils";
import { FaAccessibleIcon, FaCloud, FaDollarSign, FaDownload, FaEraser, FaHeart, FaHeartPulse, FaRobot, FaRoute, FaTerminal } from "react-icons/fa6";

export function FeaturesSection() {
    const features = [
        {
            title: "No Sign-up Needed",
            description: "Start learning instantly without creating an account.",
            icon: <FaTerminal />,
        },
        {
            title: "Forever Free",
            description: "100% free to use. No hidden fees, no paywalls—ever.",
            icon: <FaDollarSign />,
        },
        {
            title: "Personalized Daily Steps",
            description: "We break your learning topic into clear, manageable daily steps.",
            icon: <FaRoute />,
        },
        {
            title: "Progress Tracking",
            description: "Mark each topic as 'learned' and stay motivated through completion.",
            icon: <FaHeartPulse />,
        },
        {
            title: "Export to CSV",
            description: "Download your learning progress and roadmap as a CSV file anytime.",
            icon: <FaDownload />,
        },
        {
            title: "AI-Powered Topic Breakdown",
            description: "Get smartly segmented learning modules designed by our AI.",
            icon: <FaRobot />,
        },
        {
            title: "Focused and Clean UI",
            description: "No distractions, no clutter—just you and your roadmap.",
            icon: <FaEraser />,
        },
        {
            title: "Works Offline",
            description: "No Need of any internet Connection to access your Roadmap",
            icon: <FaCloud />,
        },
    ];
      
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-32 max-w-7xl mx-auto">
            {features.map((feature, index) => (
                <Feature key={feature.title} {...feature} index={index} />
            ))}
        </div>
    );
}

const Feature = ({
    title,
    description,
    icon,
    index,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
}) => {
    return (
        <div
            className={cn(
                "flex flex-col lg:border-r  py-10 relative group/feature border-neutral-800",
                (index === 0 || index === 4) && "lg:border-l border-neutral-800",
                index < 4 && "lg:border-b border-neutral-800"
            )}
        >
            {index < 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t to-transparent pointer-events-none" />
            )}
            {index >= 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b to-transparent pointer-events-none" />
            )}
            <div className="mb-4 relative z-10 px-10 text-neutral-400">
                {icon}
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
                <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-100">
                    {title}
                </span>
            </div>
            <p className="text-sm text-neutral-300 max-w-xs relative z-10 px-10">
                {description}
            </p>
        </div>
    );
};
