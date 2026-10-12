-- LearnAI: new platform design replaces the old desktop screen in the device frame; the old CMS mobile screenshot is removed (the archive had no phone screen)
UPDATE public.projects
SET website_image = '/__l5e/assets-v1/d4d35f2f-5cae-4f41-937c-00aa0d3f322a/LearnAI__platform_hero_dotai_learning_companion.webp',
    mobile_image = NULL
WHERE slug = 'learnai';