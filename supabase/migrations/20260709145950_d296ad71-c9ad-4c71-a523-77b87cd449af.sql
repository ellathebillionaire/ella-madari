UPDATE public.projects
SET website_image = '/assets/sfd/real-website-desktop.png',
    mobile_image = '/assets/sfd/real-website-mobile.png',
    description = 'מיתוג מלא ובניית אתר איקומרס חי לשיטת אימון לרקדנים (strengthfordancers.com)'
WHERE slug = 'sfd';

UPDATE public.project_images SET image_url = '/assets/sfd/real-stats.png'
WHERE id = '9641d980-a913-4f0d-8b95-0ce218f485a5';

INSERT INTO public.project_images (project_id, image_url, alt_text, display_order)
VALUES ('c3a15510-a6b3-4b12-849a-8c32b369e90f', '/assets/sfd/real-hero-mobile.jpg', 'SFD dancer training', 5);