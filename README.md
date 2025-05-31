# Kenya Criminal Legal Agent Assistant - Android App Structure

This directory contains the Android app structure for the Kenya Criminal Legal Agent Assistant. The app is designed to provide mobile access to the same functionality available on the website, with a native Android experience.

## Project Structure

The Android app follows the standard Android project structure with MVVM architecture:

- `app/src/main/java/com/sureintel/legalagent/` - Java/Kotlin source code
- `app/src/main/res/` - Resources (layouts, drawables, values)
- `app/src/main/AndroidManifest.xml` - App manifest
- `app/build.gradle` - App-level build configuration
- `build.gradle` - Project-level build configuration

## Features

The Android app includes the following features:

1. WhatsApp authentication integration
2. Legal query submission
3. Document upload and analysis
4. Results viewing and sharing
5. Push notifications for query/document status updates
6. Offline access to previous results
7. Direct WhatsApp communication

## Development Setup

To set up the development environment:

1. Install Android Studio
2. Clone this repository
3. Open the project in Android Studio
4. Sync Gradle files
5. Build and run the app

## Configuration

The app connects to the same backend API as the website. Configuration settings are stored in `app/src/main/res/values/config.xml`.

## Deployment

To build a release APK:

1. Update version information in `app/build.gradle`
2. Run `./gradlew assembleRelease`
3. Sign the APK with your keystore
4. The signed APK will be available in `app/build/outputs/apk/release/`
