import Image from 'next/image';
import { ProjectsType } from '../constants/courseConstant';

const ProjectCard = ({ name, description, image }: { name: string; description: string; image: string }) => {
    return (
        <div className="relative shrink-0 w-80 h-96 mx-4 rounded-2xl overflow-hidden 
                       bg-background backdrop-blur-sm border border-border
                       transition-all duration-500 ease-out
                       hover:shadow-2xl hover:shadow-primary/10
                       hover:border-primary/30 group
                       whitespace-normal">
            
            <div className="relative w-full h-48 overflow-hidden">
                <Image 
                    src={image} 
                    alt={name} 
                    fill
                    className="object-cover transition-transform duration-500 
                              group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-t to-black/20" />
            </div>
            
            <div className="relative p-6 h-48 bg-background flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 
                                   line-clamp-2 leading-tight">
                        {name}
                    </h3>
                    <p className="text-sm text-muted-foreground  leading-relaxed 
                                  line-clamp-4">
                        {description}
                    </p>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                    <div className="h-px bg-linear-to-r from-primary/50 to-transparent flex-1" />
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
            <p className='text-center bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent mt-4'>Our Real-Time projects help you gain knowledge and enhance your skills.</p>

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