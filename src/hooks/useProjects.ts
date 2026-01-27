import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Project = Database['public']['Tables']['projects']['Row'];
type ProjectImage = Database['public']['Tables']['project_images']['Row'];

export interface ProjectWithImages extends Project {
  project_images: ProjectImage[];
}

export const useProjects = () => {
  const [projects, setProjects] = useState<ProjectWithImages[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        project_images (*)
      `)
      .order('display_order', { ascending: true });

    if (!error && data) {
      // Sort images by display_order
      const sorted = data.map(project => ({
        ...project,
        project_images: (project.project_images || []).sort(
          (a, b) => (a.display_order || 0) - (b.display_order || 0)
        )
      }));
      setProjects(sorted as ProjectWithImages[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const addProject = async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single();
    
    if (!error) {
      await fetchProjects();
    }
    return { data, error };
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    const { error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id);
    
    if (!error) {
      await fetchProjects();
    }
    return { error };
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (!error) {
      await fetchProjects();
    }
    return { error };
  };

  const addProjectImage = async (projectId: string, imageUrl: string, altText?: string) => {
    // Get max display order
    const project = projects.find(p => p.id === projectId);
    const maxOrder = Math.max(0, ...(project?.project_images || []).map(i => i.display_order || 0));

    const { error } = await supabase
      .from('project_images')
      .insert({
        project_id: projectId,
        image_url: imageUrl,
        alt_text: altText,
        display_order: maxOrder + 1
      });
    
    if (!error) {
      await fetchProjects();
    }
    return { error };
  };

  const deleteProjectImage = async (imageId: string) => {
    const { error } = await supabase
      .from('project_images')
      .delete()
      .eq('id', imageId);
    
    if (!error) {
      await fetchProjects();
    }
    return { error };
  };

  const uploadImage = async (file: File, projectSlug: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${projectSlug}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('portfolio-images')
      .upload(fileName, file);

    if (error) return { url: null, error };

    const { data: { publicUrl } } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(data.path);

    return { url: publicUrl, error: null };
  };

  return {
    projects,
    loading,
    fetchProjects,
    addProject,
    updateProject,
    deleteProject,
    addProjectImage,
    deleteProjectImage,
    uploadImage
  };
};
