# Project rules

- Classify portfolio gallery media in `src/lib/mediaGroups.ts` with project-specific filename rules and conservative shared fallbacks, then render contiguous topic groups. This keeps uploaded media organized without changing CMS records or inventing AI attribution.
- Render topic media through `ProjectMediaGroup` and full-screen viewing through `PortfolioLightbox`; mobile compositions preserve complete assets and touch navigation while desktop keeps its existing grid.
- Compose desktop projects as compact screen/topic/identity columns with all media previews visible; preserve larger touch compositions below the desktop breakpoint, reducing scroll without hiding assets.
- Assign opening logos explicitly in `src/data/projects.ts` using verified supplied assets; exclude that exact asset from topic galleries so CMS gallery order cannot suppress or duplicate the opening logo.
- Resolve replaced CMS media paths through asset pointers in `src/lib/imageResolver.ts` so corrected recordings do not require CMS changes or committed video binaries.- Each project opening uses a fixed identity aside (logo, palette, story/values) beside the main visual (screens or first gallery group); keeps recurring elements in predictable places.
