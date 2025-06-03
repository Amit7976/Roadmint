import { cn } from "@/lib/utils";
import features from "@/utils/constants/features";


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////


export function FeaturesSection() {  
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 relative z-10 pt-20 pb-32 lg:pt-32 px-4 lg:px-0 max-w-7xl mx-auto select-none gap-2 lg:gap-0">
            {features.map((feature, index) => (
                <Feature key={feature.title} {...feature} index={index} />
            ))}
        </div>
    );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

const Feature = ({
    title,
    description,
    icon,
    index,
}: {
    title: string;
    description: string;
    icon: React.ComponentType;
    index: number;
}) => {
    const Icon = icon;

    return (
        <div
            className={cn(
                "flex flex-col border lg:border-0 lg:border-r py-10 relative group/feature border-neutral-800",
                (index === 0 || index === 4) && "lg:border-l border-neutral-800",
                index < 4 && "lg:border-b border-neutral-800"
            )}
        >
            {index < 4 ? (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t to-transparent pointer-events-none" />
            ) : (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b to-transparent pointer-events-none" />
            )}

            <div className="mb-4 relative z-10 px-10 text-neutral-400 text-xl group-hover/feature:text-green-500">
                <Icon />
            </div>

            <div className="text-lg font-bold mb-2 relative z-10 px-10">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full group-hover/feature:bg-purple-500 transition-all duration-200 origin-center" />
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
  