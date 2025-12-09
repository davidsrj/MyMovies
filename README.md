# MyMovies

![MyMovies app intro](assets/MyMoviesAppIntro.gif)

MyMovies is a React Native demo app optimized for Android TV that lets you browse a catalog of movies, view details, and play trailers.

This document explains how to set up the project, run it on an Android TV emulator, run tests, and understand the main libraries and current limitations.

## Prerequisites

- macOS
- Node.js 20+ (see `"engines"` in `package.json`)
- Yarn or npm (examples below use npm)
- Java JDK 17 (recommended for React Native 0.82)
- Android Studio with:
	- Android SDK Platform 34 (or close)
	- Android TV system image (e.g. **Android TV (Google APIs) x86_64**)
	- Android SDK Tools and Platform Tools in your `PATH` (`adb`, `emulator`)

If you haven’t set up Android for React Native before, follow the official guide and ensure `ANDROID_HOME` / `ANDROID_SDK_ROOT` are configured.

## Install dependencies

From the project root:

```bash
npm install
```

If you prefer yarn:

```bash
yarn install
```

## Running on Android TV emulator

### 1. Create an Android TV virtual device

In Android Studio:

1. Open **Device Manager**.
2. Click **Create Device…**.
3. Choose **TV > Android TV (1080p)** or similar.
4. Select a system image with **Google APIs** (recommended x86_64 image).
5. Finish the wizard.

### 2. Start the Android TV emulator

You can start it from Android Studio’s Device Manager, or from the terminal:

```bash
emulator -avd <Your_Android_TV_AVD_Name>
```

Wait until the emulator is fully booted before continuing (home screen is responsive).

### 3. Run the Metro bundler (optional but explicit)

In one terminal from the project root:

```bash
npm start
```

This runs Metro on the default port (8081).

### 4. Build and run the Android app on the TV emulator

In another terminal, still in the project root:

```bash
npm run android
```

This will:

- Build the Android app via the React Native CLI.
- Install it on the running emulator.
- Launch **MyMovies** on the Android TV home screen.

If multiple devices are connected, you may need to use `adb` to target the TV emulator explicitly.

## Running tests

The project uses **Jest** with **@testing-library/react-native** for unit and integration tests.

To run the full test suite:

```bash
npm test
```

Jest configuration lives in `jest.config.js`, and setup (including React Native Testing Library configuration) is in `jest.setup.js`. Test files are under `__tests__/`.

## Main libraries and why they’re used

### Runtime

- **react / react-native** – Core framework for building the cross-platform mobile/TV UI.

- **@react-navigation/native** and **@react-navigation/native-stack** – Handles navigation between screens such as Home, Details, and Player, with a simple stack-style experience that works well on TV.

- **react-native-screens** – Native-backed screen components for better performance and memory usage with React Navigation.

- **react-native-safe-area-context** – Manages safe areas (e.g. top/bottom insets) so layouts look correct on different devices and TVs.

- **react-native-vector-icons** – Icon library used for consistent icons (e.g. play/back) without custom image assets.

- **react-native-video** – Video playback for trailers or movie content, supporting TV-style playback behavior.

- **nativewind** + **tailwindcss** – Utility-first styling in React Native components, making it fast to build responsive, consistent UIs with className-based styles.

### Tooling and testing

- **jest** – JavaScript/TypeScript test runner used for unit and integration tests.

- **@testing-library/react-native** & **@testing-library/jest-native** – Encourages testing components via their behavior and UI, similar to how a user would interact with them.

- **react-test-renderer** – Used by Jest to render components in tests.

- **typescript** & **@types/*** – Adds static typing for safer refactors and better IDE support.

- **eslint** & **@react-native/eslint-config** – Linting for consistent code style and catching common issues.

- **prettier** – Automatic code formatting.

- **@react-native/babel-preset**, **@babel/*** – Babel configuration to compile modern JavaScript/TypeScript for React Native.

- **@react-native/metro-config** – Metro bundler configuration for React Native.

## Project structure

- `App.tsx` – Application entry point.
- `src/navigation/RootNavigator.tsx` – Sets up navigation between screens.
- `src/screens/` – Screen components:
	- `HomeScreen.tsx` – Movie list / browsing.
	- `DetailsScreen.tsx` – Movie details.
	- `PlayerScreen.tsx` – Video playback.
- `src/components/` – Reusable UI components such as:
	- `cards/MovieCard.tsx`
	- `buttons/PlayButton.tsx`, `buttons/PlayerBackButton.tsx`
	- `header/HomeHeader.tsx`, `header/DetailsHeader.tsx`
	- `sections/PopularMovies.tsx`
	- `wrappers/MainWrapper.tsx`
- `src/hooks/useCatalog.ts` – Catalog hook (reads data from `assets/catalog.json`).
- `assets/catalog.json` – Static movie catalog data.
- `__tests__/` – Jest tests (components, hooks, screens, and integration flow).

## Known limitations

- **Android TV focused**: The UX and navigation are optimized for Android TV. While the app can run on phones/tablets, focus/remote navigation patterns are primarily tuned for TV.

- **Static data**: Movie catalog is loaded from a local JSON file (`assets/catalog.json`); there is no backend or network layer.

- **Limited error handling**: Minimal handling for video playback errors, missing assets, or malformed catalog entries.

- **No offline/download support**: All content is assumed to be available locally or via streaming; no download or offline management is implemented.

- **Accessibility**: Basic semantics are present, but full accessibility (screen readers, focus indicators, etc.) has not been fully audited.

## TODOs / Possible improvements

- Add real API integration for the catalog (e.g., pagination, search, filtering by genre).

- Improve TV remote navigation (focus management, remembering last focused item, better d-pad behavior).

- Add favorites/watchlist feature persisted to local storage.

- Enhance player controls (seek, subtitles, audio tracks, progress bar).

- Expand test coverage, especially around navigation flows and edge cases.

- Add CI workflow to run tests and lint checks on each commit/PR.

- Improve accessibility support and validate on a range of TV devices.

## License
This project is provided as a demo/sample; adapt the licensing section to your needs before publishing.
# MyMovies
