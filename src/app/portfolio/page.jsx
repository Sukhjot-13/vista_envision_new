import { getProjects } from "@/actions/projectActions";
import { ProjectCard } from "@/components/Portfolio";

export const dynamic = 'force-dynamic';

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <main className="pt-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#474846] mb-6">
            Our Portfolio
          </h1>
          <p className="text-[#474846]/70 max-w-2xl mx-auto text-lg">
            A collection of our finest work in architectural visualization,
            product rendering, and 3D animation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
                key={project._id} 
                project={{
                    id: project._id,
                    title: project.title,
                    category: project.tags[0], // Use first tag as category
                    image: project.imageUrl
                }} 
                index={index} 
            />
          ))}
          {projects.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-12">
                  No projects found. Check back soon!
              </div>
          )}
        </div>
      </div>
    </main>
  );
}
