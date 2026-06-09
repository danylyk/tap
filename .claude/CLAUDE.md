# CLAUDE.md

## Project

TAP is an iOS and Android mobile game built with React Native, Expo, and Three.js through React Three Fiber. It is an isometric 3D auto-runner: the player moves forward automatically and the user taps to toggle direction between the two isometric axes, collecting coins and avoiding hazards. Hitting a hazard ends the run and drops a defeat marker; reaching the end finishes the map and raises the account level. It is a user-generated game where players play, build, and publish maps. The game world uses a casual voxel art style in the spirit of Crossy Road and ZigZag; the surrounding app UI uses a native iOS style in the spirit of the Apple Games and App Store apps. The game world is rendered inside the React Three Fiber canvas and the app UI is built with React Native; these are two separate design systems and the canvas edge is the boundary between them.

## Commands

The app lives in the `app/` directory; run all commands from there. `npm start` runs the Expo dev server, and `npm run ios` and `npm run android` build and run on a device. `npm run lint` runs `expo lint` followed by `tsc --noEmit` and is the lint and typecheck gate; run it before considering work done.

## Structure

Source is under `app/src`. Routes are in `app/src/app` using file-based expo-router. Feature modules live in `app/src/modules`, one folder per feature, each a small single-responsibility piece; game modules are prefixed `game-`. Shared stores, hooks, events, and UI primitives are in `app/src/elements`. Utilities are in `app/src/lib`. GLB models and scene config JSON are in `app/public/models`.

## State and data

State uses zustand, with one store per domain in `app/src/elements/stores`. Cross-module communication uses a mitt event bus in `app/src/elements/events/game.ts`. Scene and map data is loaded and validated with zod in the `game-content` module. Keep the data layer swappable between local JSON and a remote backend, since account progress and level are server-synced and 3D assets are loaded remotely. Networking uses ky. Persistence uses AsyncStorage through expo-zustand-persist.

## Conventions

TypeScript is in strict mode. Styling is Tailwind through uniwind. Navigation is expo-router with a bottom tab bar from @react-navigation/bottom-tabs. Write readable, declarative code that describes what rather than how, using idiomatic patterns and small, composable, single-responsibility modules.

## Rules

- Run all commands from the `app/` directory, and run `npm run lint` before considering work done.
- Keep the game world inside the React Three Fiber canvas and the app UI in React Native; do not blend the casual game style into the native UI or vice versa.
- Add features as small, single-responsibility modules under `app/src/modules`.
- Favor low coupling and high cohesion: keep each module focused on one responsibility with everything it needs together, and let modules depend on shared contracts and events rather than on each other's internals.
- Name modules and files from wider scope to more specific, so related names group together (for example `game-player`, `game-score`).
- Keep shared state in zustand stores under `app/src/elements/stores`, one per domain, and use the mitt event bus for cross-module communication instead of coupling modules directly.
- Validate external and scene data with zod, and keep the data layer swappable between local JSON and a remote backend.
- Reuse existing stores, hooks, UI primitives, and utilities from `app/src/elements` and `app/src/lib` before adding new ones.
