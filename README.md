
# Little Fly 🪰

An interactive browser experiment where a virtual creature follows light, avoids obstacles, and responds to changes in its circuit.

## Try it

Move the light and watch the creature follow it. Disable a sensor or motor to discover how its movement changes.

## Features

- Light-seeking and light-avoiding behavior
- Eight interactive circuit nodes with live activity indicators
- Add and remove obstacles
- Movement trails and simulation statistics
- Adjustable simulation speed and sight range
- Responsive layout for desktop and mobile
- Optional Google Analytics 4 integration

## Controls

| Control | Action |
|---|---|
| Move light | Click the arena to place the light |
| Add obstacle | Click clear ground to add an obstacle |
| Remove | Click an obstacle to remove it |
| Circuit nodes | Click to disable or re-enable a node |
| Space | Pause or resume |
| Arrow keys | Move the light while the arena is focused |
| R | Reset the experiment while the arena is focused |

## How it works

The creature uses a handcrafted eight-node sensory–motor circuit:

- Two light sensors
- Two obstacle sensors
- Two steering nodes
- Two motor nodes

Sensor activity feeds the steering nodes, which control the left and right motors. Disabling nodes changes the controller and the creature’s behavior.

Physical collision handling keeps the creature outside solid obstacles.

**This is a fly-inspired simulation. It does not use actual FlyWire connectivity data or reproduce a biological fruit-fly brain.**

## Run locally

Open `little-fly-vercel/index.html` in a modern browser.

No installation, build step, database, or API key is required.

## Deploy to Vercel

Import this GitHub repository into Vercel with:

| Setting | Value |
|---|---|
| Root Directory | `little-fly-vercel` |
| Framework Preset | Other |
| Build Command | Leave empty |
| Output Directory | `.` |

Deploy the project and share its public production URL.

Each visitor gets an independent simulation. Progress resets when the page reloads; this is not a multiplayer app.

## Google Analytics

Analytics is optional and disabled until configured.

1. Create a Google Analytics 4 property.
2. Add a Web data stream for your deployed website.
3. Copy the Measurement ID starting with `G-`.
4. Update `little-fly-vercel/config.js`:

```js
window.LITTLE_FLY_CONFIG = {
  googleAnalyticsId: 'G-YOUR_MEASUREMENT_ID'
};
```

5. Commit the change and redeploy.
6. Visit your deployed website and check Analytics’ Realtime report.

Localhost and downloaded file copies do not load Analytics. The integration uses default page-view measurement and does not send custom gameplay events.

## Built with

- HTML
- CSS
- JavaScript
- Canvas API

## Inspiration

Inspired by exploring simple sensory–motor behavior and the [FlyWire connectome](https://flywire.ai/).
