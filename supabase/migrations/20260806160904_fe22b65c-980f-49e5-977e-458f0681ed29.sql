-- Delete related images first, then the project
DELETE FROM public.project_images WHERE project_id = '678cb439-44c6-4efb-9dd1-3d0dc3e64913';
DELETE FROM public.projects WHERE id = '678cb439-44c6-4efb-9dd1-3d0dc3e64913';