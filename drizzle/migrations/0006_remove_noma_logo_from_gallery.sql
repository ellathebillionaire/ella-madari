-- NOMA's logo moves next to the desktop screen in the UI, so remove it from the gallery and close the display_order gap
DELETE FROM public.project_images
WHERE id = '7fe2f293-f7fd-4523-9a8d-51eae2b80dd8';

UPDATE public.project_images pi
SET display_order = pi.display_order - 1
WHERE pi.project_id = (SELECT id FROM public.projects WHERE slug = 'noma')
  AND pi.display_order > 0;