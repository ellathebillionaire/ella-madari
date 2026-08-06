import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Static project data - mirrors src/data/projects.ts
const staticProjects = [
  {
    slug: 'acropolis',
    images: [
      'acropolis-home.png',
      'acropolis-about.png',
      'acropolis-contact.png',
      'acropolis-projects.png',
      'acropolis-services.png',
    ],
  },
  {
    slug: 'dronify',
    images: [
      'dronify-home.png',
      'dronify-about.png',
      'dronify-contact.png',
      'dronify-projects.png',
      'dronify-services.png',
    ],
  },
  {
    slug: 'athenas',
    images: [
      'athenas-home.png',
      'athenas-about.png',
      'athenas-contact.png',
      'athenas-projects.png',
      'athenas-services.png',
    ],
  },
  {
    slug: 'zues',
    images: [
      'zues-home.png',
      'zues-about.png',
      'zues-contact.png',
      'zues-projects.png',
      'zues-services.png',
    ],
  },
  {
    slug: 'hera',
    images: [
      'hera-home.png',
      'hera-about.png',
      'hera-contact.png',
      'hera-projects.png',
      'hera-services.png',
    ],
  },
  {
    slug: 'poseidon',
    images: [
      'poseidon-home.png',
      'poseidon-about.png',
      'poseidon-contact.png',
      'poseidon-projects.png',
      'poseidon-services.png',
    ],
  },
  {
    slug: 'betterseeds',
    images: [
      'betterseeds-hero.jpg',
      'ai-gene-editing.png',
      'ai-dna-scientist.png',
      'ai-plant-technology.jpg',
      'ai-drone-farming.png',
      'ai-crispr-lab.png',
    ],
    websiteImage: 'website-betterseeds.jpg',
    mobileImage: 'betterseeds-mobile.png',
  },
  {
    slug: 'sfd',
    images: [
      'sfd/main-logo.jpg',
      'sfd/secondary-logo.jpg',
      'sfd/symbol.jpg',
      'sfd/tshirt-mockup.jpg',
      'sfd-bands-product.png',
    ],
    websiteImage: 'sfd/website-desktop-new.png',
    mobileImage: 'sfd/website-mobile-new.png',
  },
  {
    slug: 'meshek27',
    images: [
      'meshek27/logo-clean.jpg',
      'meshek27/app-icons.jpg',
      'meshek27/wall-signage.jpg',
      'meshek27/box-vegetables.jpg',
      'meshek27/box-design.jpg',
      'meshek27/tshirt-mockup.jpg',
    ],
  },
  {
    slug: 'learnai',
    images: [
      'learnai-logo-full.jpg',
      'dotai-monogram.jpg',
    ],
    websiteImage: 'learnai-website-cropped.png',
  },
  {
    slug: 'sisenora',
    images: [
      'sisenora-logo-new.jpg',
      'mockup-sisenora-shop.png',
    ],
    websiteImage: 'sisenora-website-new.png',
  },
  {
    slug: 'ascola',
    images: [
      'ascola/logo.jpg',
      'ascola/branding-mockup.jpg',
    ],
    websiteImage: 'ascola/website-screen.png',
  },
  {
    slug: 'taliter',
    images: [
      'taliter/branding-set.jpg',
      'taliter/wall-signage.jpg',
      'taliter/bottle-mockup.jpg',
    ],
  },
  {
    slug: 'ebrider',
    images: [
      'ebrider-logo-new.jpg',
      'ebrider-symbol.jpg',
      'ebrider-mockup-hero.jpg',
    ],
    mobileImage: 'ebrider-mobile.png',
  },
  {
    slug: 'studioalef',
    images: [
      'studioalef-logo.png',
    ],
  },
  {
    slug: 'sen',
    images: [
      'website-sen-mobile.png',
    ],
  },
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Authenticate the caller
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const authClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await authClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = claimsData.claims.sub;

    // Check admin role
    const { data: roleData, error: roleError } = await authClient
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    if (roleError || !roleData) {
      return new Response(
        JSON.stringify({ error: "Forbidden - Admin access required" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Authenticated as admin — use service role for writes
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const results: { slug: string; imagesUpdated: number; websiteImage: boolean; mobileImage: boolean }[] = [];

    for (const project of staticProjects) {
      const { data: dbProject, error: projectError } = await supabase
        .from('projects')
        .select('id, website_image, mobile_image')
        .eq('slug', project.slug)
        .maybeSingle();

      if (projectError || !dbProject) {
        console.log(`Project ${project.slug} not found in database`);
        continue;
      }

      let imagesUpdated = 0;
      let websiteUpdated = false;
      let mobileUpdated = false;

      const { data: existingImages } = await supabase
        .from('project_images')
        .select('image_url')
        .eq('project_id', dbProject.id);

      const existingUrls = new Set(existingImages?.map(img => img.image_url) || []);

      for (let i = 0; i < project.images.length; i++) {
        const imagePath = project.images[i];
        const imageUrl = `/assets/${imagePath}`;
        
        const alreadyExists = Array.from(existingUrls).some(url => 
          url.includes(imagePath.split('/').pop() || imagePath)
        );

        if (!alreadyExists) {
          const { error: insertError } = await supabase
            .from('project_images')
            .insert({
              project_id: dbProject.id,
              image_url: imageUrl,
              alt_text: project.slug,
              display_order: i,
            });

          if (!insertError) {
            imagesUpdated++;
          }
        }
      }

      if (project.websiteImage && !dbProject.website_image) {
        const { error: updateError } = await supabase
          .from('projects')
          .update({ website_image: `/assets/${project.websiteImage}` })
          .eq('id', dbProject.id);
        
        if (!updateError) {
          websiteUpdated = true;
        }
      }

      if (project.mobileImage && !dbProject.mobile_image) {
        const { error: updateError } = await supabase
          .from('projects')
          .update({ mobile_image: `/assets/${project.mobileImage}` })
          .eq('id', dbProject.id);
        
        if (!updateError) {
          mobileUpdated = true;
        }
      }

      results.push({
        slug: project.slug,
        imagesUpdated,
        websiteImage: websiteUpdated,
        mobileImage: mobileUpdated,
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Sync completed',
      results 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
