-- Update Si Señora with new live site + AI catalog imagery
UPDATE public.projects
SET website_image = '/assets/portfolio/sisenora_web.jpg',
    mobile_image  = '/assets/portfolio/sisenora_mobile.jpg',
    aspect_ratio  = '16/10',
    description   = 'מיתוג ובניית אתר מכירות + הפקת ימי צילום ותמונות מוצר לעסק תיקי וואיו בעבודת יד',
    updated_at = now()
WHERE slug = 'sisenora';

DELETE FROM public.project_images
WHERE project_id = (SELECT id FROM public.projects WHERE slug = 'sisenora');

INSERT INTO public.project_images (project_id, image_url, alt_text, display_order)
SELECT id, v.img, v.alt, v.ord FROM public.projects p,
(VALUES
  ('/assets/sisenora/catalog/product-1.jpg', 'תיק וואיו כחול על סולם עץ', 0),
  ('/assets/sisenora/catalog/product-2.jpg', 'תיק וואיו צבעוני על מדרגות אבן', 1),
  ('/assets/sisenora/catalog/product-3.jpg', 'תיק מוצ׳ילה וואיו על משטח אבן', 2),
  ('/assets/sisenora/catalog/model-1.jpg', 'דוגמנית עם תיק וואיו על רקע קיר אבן', 3),
  ('/assets/sisenora/catalog/model-2.jpg', 'דוגמנית עם תיק טורקיז מול בית לבן', 4),
  ('/assets/sisenora/catalog/model-3.jpg', 'דוגמנית בחצר עם תיק צבעוני', 5),
  ('/assets/sisenora/catalog/bts-1.jpg', 'איפור ומוד בורד ביום צילום', 6),
  ('/assets/sisenora/catalog/bts-2.jpg', 'מאחורי הקלעים - צלם ודוגמנית', 7),
  ('/assets/sisenora/catalog/bts-3.jpg', 'מאחורי הקלעים ביום צילום', 8)
) AS v(img, alt, ord)
WHERE p.slug = 'sisenora';

-- Update Meshek 27 with the new live website mockups
UPDATE public.projects
SET website_image = '/assets/portfolio/meshek27_web.jpg',
    mobile_image  = '/assets/portfolio/meshek27_mobile.jpg',
    aspect_ratio  = '16/10',
    description   = 'מיתוג ובניית אתר הזמנות ירקות ופירות טריים מהשדה - משק 27',
    updated_at = now()
WHERE slug = 'meshek27';

-- Add the SFD summer workshop 2026 landing page to the SFD gallery
INSERT INTO public.project_images (project_id, image_url, alt_text, display_order)
SELECT id, '/assets/sfd/summer-course-2026.jpg', 'דף נחיתה סדנת קיץ 2026 - Strength For Dancers', 10
FROM public.projects WHERE slug = 'sfd';

-- New project: Pet Play Pal (e-commerce landing)
WITH ins AS (
  INSERT INTO public.projects (slug, name, category, description, hero_image, bg_color, accent_color, colors, website_image, mobile_image, aspect_ratio, display_order, is_visible)
  VALUES ('petplaypal', 'Play Pet Pal', 'website',
    'עיצוב ובניית דף מכירה למוצר - צעצוע אינטראקטיבי לחיות מחמד',
    '/assets/portfolio/petplaypal_web.jpg', '#F4FBFC', '#10B3C7',
    ARRAY['#10B3C7','#F97316','#1E2A44'],
    '/assets/portfolio/petplaypal_web.jpg', '/assets/portfolio/petplaypal_mobile.jpg',
    '16/10', 10, true)
  RETURNING id
)
INSERT INTO public.project_images (project_id, image_url, alt_text, display_order)
SELECT ins.id, v.img, v.alt, v.ord FROM ins,
(VALUES
  ('/assets/petplaypal/toy-bird.png', 'צעצוע ציפור', 0),
  ('/assets/petplaypal/toy-chicken.png', 'צעצוע תרנגול', 1),
  ('/assets/petplaypal/dog-playing.jpg', 'כלב משחק עם הצעצוע', 2),
  ('/assets/petplaypal/cat-toy.jpg', 'חתול עם הצעצוע', 3),
  ('/assets/petplaypal/before-after.jpg', 'לפני ואחרי', 4)
) AS v(img, alt, ord);

-- New project: Hashevet (community travel website)
INSERT INTO public.projects (slug, name, category, description, hero_image, bg_color, accent_color, colors, website_image, mobile_image, aspect_ratio, display_order, is_visible)
VALUES ('hashevet', 'השבט', 'website',
  'עיצוב ובניית אתר לקהילת טיולים וחוויות - השבט',
  '/assets/portfolio/hashevet_web.jpg', '#FFF7ED', '#EF7C1B',
  ARRAY['#EF7C1B','#F5A623','#FFF7ED'],
  '/assets/portfolio/hashevet_web.jpg', '/assets/portfolio/hashevet_mobile.jpg',
  '16/9', 11, true);

-- New project: Harel Amir (event/DJ landing page)
WITH ins AS (
  INSERT INTO public.projects (slug, name, category, description, hero_image, bg_color, accent_color, colors, website_image, mobile_image, aspect_ratio, display_order, is_visible)
  VALUES ('harelamir', 'Harel Amir', 'website',
    'עיצוב ובניית דף נחיתה להפקת אירועים ומסיבות',
    '/assets/harel/euforia-stage-wide.jpg', '#12101E', '#F5A623',
    ARRAY['#F5A623','#E94560','#12101E'],
    '/assets/harel/euforia-stage-wide.jpg', '/assets/harel/euforia-stage-mobile.jpg',
    '16/9', 12, true)
  RETURNING id
)
INSERT INTO public.project_images (project_id, image_url, alt_text, display_order)
SELECT ins.id, v.img, v.alt, v.ord FROM ins,
(VALUES
  ('/assets/harel/euforia-hero-stage.jpg', 'במה בהופעה', 0),
  ('/assets/harel/euforia-crowd-front.jpg', 'קהל מול הבמה', 1),
  ('/assets/harel/euforia-stage-canopy-night.jpg', 'במה בלילה', 2),
  ('/assets/harel/euforia-beach-day.jpg', 'אירוע חוף', 3)
) AS v(img, alt, ord);