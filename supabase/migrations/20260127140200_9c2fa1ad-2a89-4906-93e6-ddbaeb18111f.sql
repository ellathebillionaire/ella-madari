-- Add aspect_ratio column to projects table for custom mockup dimensions
ALTER TABLE public.projects 
ADD COLUMN aspect_ratio text DEFAULT '16/9';

-- Add comment for documentation
COMMENT ON COLUMN public.projects.aspect_ratio IS 'Custom aspect ratio for website mockups (e.g., 16/9, 4/3, 16/10)';