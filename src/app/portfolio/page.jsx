'use client';

import { getProjects } from "@/actions/projectActions";
import { ProjectCard } from "@/components/ProjectCard";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const categories = ["All", "Architecture", "Interior Design", "Product Visualization", "Animation"];

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      async function fetchProjects() {
          const data = await getProjects();
          setProjects(data);
          setFilteredProjects(data);
          setLoading(false);
      }
      fetchProjects();
  }, []);

  useEffect(() => {
      if (activeCategory === "All") {
          setFilteredProjects(projects);
      } else {
          setFilteredProjects(projects.filter(p => p.category === activeCategory));
      }
  }, [activeCategory, projects]);

  return (
    <main className="pt-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#474846] mb-6">
            Our Portfolio
          </h1>
          <p className="text-[#474846]/70 max-w-2xl mx-auto text-lg">
            A collection of our finest work in architectural visualization,
            product rendering, and 3D animation.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
                <Button
                    key={cat}
                    variant={activeCategory === cat ? "default" : "outline"}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full ${activeCategory === cat ? 'bg-[#F4D854] text-[#474846] hover:bg-[#F4D854]/90' : 'text-[#474846]'}`}
                >
                    {cat}
                </Button>
            ))}
        </div>

        {loading ? (
            <div className="text-center py-12">Loading projects...</div>
        ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
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
            {filteredProjects.length === 0 && (
                <div className="col-span-full text-center text-gray-500 py-12">
                    No projects found in this category.
                </div>
            )}
            </div>
        )}
      </div>
    </main>
  );
}
