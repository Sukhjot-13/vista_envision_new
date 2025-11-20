import { getProject } from "@/actions/projectActions";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function ProjectDetailsPage({ params }) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return (
        <div className="pt-32 text-center">
            <h1 className="text-2xl font-bold">Project not found</h1>
            <Link href="/portfolio" className="text-blue-600 hover:underline mt-4 inline-block">Back to Portfolio</Link>
        </div>
    );
  }

  return (
    <main className="pt-20 bg-white min-h-screen pb-20">
      {/* Cover Image */}
      <div className="relative h-[60vh] w-full">
        <ImageWithFallback
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-end">
            <div className="max-w-7xl mx-auto px-6 w-full pb-12">
                <Link href="/portfolio">
                    <Button variant="outline" className="mb-6 bg-transparent text-white border-white hover:bg-white hover:text-black">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
                    </Button>
                </Link>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{project.title}</h1>
                <div className="flex flex-wrap gap-3">
                    <span className="bg-[#F4D854] text-[#474846] px-3 py-1 rounded-full text-sm font-medium">
                        {project.category}
                    </span>
                    {project.tags.map(tag => (
                        <span key={tag} className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Description */}
        <div className="prose max-w-none mb-16">
            <h2 className="text-2xl font-bold text-[#474846] mb-4">About the Project</h2>
            <p className="text-[#474846]/80 text-lg leading-relaxed whitespace-pre-wrap">
                {project.description}
            </p>
            {project.link && (
                <div className="mt-8">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-[#F4D854] text-[#474846] hover:bg-[#F4D854]/90">
                            Visit Live Project
                        </Button>
                    </a>
                </div>
            )}
        </div>

        {/* Image Collage */}
        {project.images && project.images.length > 0 && (
            <div className="space-y-8">
                <h2 className="text-2xl font-bold text-[#474846] mb-4">Gallery</h2>
                <div className="grid gap-8">
                    {project.images.map((img, idx) => (
                        <div key={idx} className="rounded-lg overflow-hidden shadow-lg">
                            <ImageWithFallback
                                src={img}
                                alt={`${project.title} - View ${idx + 1}`}
                                className="w-full h-auto"
                            />
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </main>
  );
}
