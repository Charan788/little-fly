# Little Fly

A browser simulation with an eight-node handcrafted sensory-motor circuit.
This version does not use downloaded FlyWire connectivity.

## Publish with GitHub and Vercel

1. Extract this ZIP. Upload its contents to a GitHub repository, with index.html at the repository root.
2. Import that repository in Vercel. Set Framework Preset to Other, leave Build Command empty, and use . as Output Directory. vercel.json supplies these settings.
3. Deploy and open the production URL. Share that URL so others can play. If visitors are asked to sign in, check the project's Deployment Protection settings for production.

No database, server, installation, or build is required. Each visitor has their own simulation. Changes reset on reload; this is not multiplayer.

## Connect Google Analytics

1. In Google Analytics, create or select a GA4 property and add a Web data stream for your production URL.
2. Copy the Measurement ID beginning with G-.
3. Edit config.js: set googleAnalyticsId to that ID, keeping the quotes.
4. Commit and push the change to trigger a Vercel deployment.
5. Open the production website and check the property's Realtime report to verify reception. Ad blockers may prevent collection.

Analytics is disabled until an ID is configured. Localhost and downloaded file copies never load the tag. The integration uses the Google tag's default page-view measurement; it does not add custom gameplay events. URLs sent in page_location omit query strings and fragments. Do not add personal information to page paths. Advertising personalization and Google signals are disabled.

The single-file little-fly.html distributed separately remains an offline version without analytics.

References:
- https://developers.google.com/analytics/devguides/collection/ga4/tag-options
- https://developers.google.com/analytics/devguides/collection/ga4/views
- https://vercel.com/docs/builds/configure-a-build
