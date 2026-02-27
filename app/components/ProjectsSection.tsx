import { ProjectsType } from '../constants/courseConstant';

const TagList = ({ label, items }: { label: string; items?: string[] }) => {
    if (!items || items.length === 0) return null;
    return (
        <div className="mt-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary/80 mb-1.5">{label}</p>
            <div className="flex flex-wrap gap-1">
                {items.map((item) => (
                    <span
                        key={item}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border"
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
};

const ProjectCard = ({ name, description, techStack, tools, skills }: ProjectsType) => {
    const hasMeta = (techStack && techStack.length > 0) || (tools && tools.length > 0) || (skills && skills.length > 0);
    return (
        <div className="relative shrink-0 w-80 mx-4 rounded-2xl overflow-hidden 
                       bg-background backdrop-blur-sm border border-border
                       transition-all duration-500 ease-out
                       hover:shadow-2xl hover:shadow-primary/10
                       hover:border-primary/30 group
                       whitespace-normal">
            
            <div className="p-6 flex flex-col justify-between min-h-[220px]">
                <div>
                    <div className="w-8 h-1 bg-primary rounded-full mb-4 group-hover:w-16 transition-all duration-300" />
                    <h3 className="text-lg font-bold text-foreground mb-2 
                                   line-clamp-2 leading-tight">
                        {name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed 
                                  line-clamp-3">
                        {description}
                    </p>

                    {hasMeta && (
                        <div className="mt-3 pt-3 border-t border-border/50">
                            <TagList label="Tech Stack" items={techStack} />
                            <TagList label="Tools" items={tools} />
                            <TagList label="Skills" items={skills} />
                        </div>
                    )}
                </div>
                
                <div className="flex items-center justify-between mt-5">
                    <div className="h-px bg-gradient-to-r from-primary/50 to-transparent flex-1" />
                    <div className="w-2 h-2 bg-primary/60 rounded-full ml-3" />
                </div>
            </div>
        </div>
    );
};

export default function ProjectsSection({ projects }: { projects: ProjectsType[] | undefined }) {
    if (!projects || projects.length === 0) {
        return null;
    }

    return (
        <section className="py-20 min-h-screen flex flex-col items-center justify-center text-foreground">
            <div className="inline-flex mb-4 items-center px-4 py-2 rounded-full bg-linear-to-r from-primary/20 to-secondary/20 border border-primary/30 backdrop-blur-sm">
                <span className="text-primary text-sm font-medium">Projects</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-center 
                           uppercase tracking-wide text-foreground">
                Hands-On Projects
            </h2>
            <p className='text-center text-muted-foreground mt-4'>Our Real-Time projects help you gain knowledge and enhance your skills.</p>

            <div className="w-full mt-12 inline-flex flex-nowrap overflow-hidden
                            mask-[linear-gradient(to_right,transparent_0,black_10%,black_90%,transparent_100%)]">
                <div className="flex items-center justify-center animate-scroll-projects">
                    {projects.map((project, index) => (
                        <ProjectCard key={`project1-${index}`} {...project} />
                    ))}
                    {projects.map((project, index) => (
                        <ProjectCard key={`project2-${index}`} {...project} aria-hidden="true" />
                    ))}
                </div>
            </div>
        </section>
    );
}
