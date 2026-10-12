# Project rules

- Classify portfolio gallery media in `src/lib/mediaGroups.ts` with project-specific filename rules and conservative shared fallbacks, then render contiguous topic groups. This keeps uploaded media organized without changing CMS records or inventing AI attribution.
- Render topic media through `ProjectMediaGroup` and full-screen viewing through `PortfolioLightbox`; mobile compositions preserve complete assets and touch navigation while desktop keeps its existing grid.