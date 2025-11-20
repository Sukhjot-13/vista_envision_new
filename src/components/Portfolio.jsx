import { getFeaturedProjects } from "@/actions/projectActions";
import { ProjectCard } from "./ProjectCard"; // We will move ProjectCard to a separate file
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export async function Portfolio() {
  const projects = await getFeaturedProjects();

  return (
    <section className="py-24 bg-white" id="portfolio">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-[#474846] mb-4">
              Featured Projects
            </h2>
            <p className="text-[#474846]/70 max-w-md">
              A selection of our most impactful work.
            </p>
          </div>
          <Link href="/portfolio">
            <Button variant="outline" className="hidden md:flex">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Link href={`/portfolio/${project._id}`} key={project._id}>
                  <ProjectCard
                    project={{
                        id: project._id,
                        title: project.title,
                        category: project.category,
                        image: project.imageUrl
                    }}
                    index={index}
                  />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg">
              No featured projects found. Stay tuned!
            </p>
          </div>
        )}

        <div className="mt-12 text-center md:hidden">
          <Link href="/portfolio">
            <Button variant="outline" className="w-full">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
