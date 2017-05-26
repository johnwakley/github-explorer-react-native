#!/bin/bash
# fail if any commands fails
set -e

GITHUB_EXPLORER_SOURCE_DIR=`pwd`

#################
# ANDROID TESTS #
#################

# Build and deploy
cd $GITHUB_EXPLORER_SOURCE_DIR/android && ./gradlew assembleRelease --stacktrace
cp $GITHUB_EXPLORER_SOURCE_DIR/android/app/build/outputs/apk/app-release.apk $GITHUB_EXPLORER_SOURCE_DIR/e2e/artifacts

# Start emulator
~/Library/Android/sdk/tools/emulator -avd Nexus_5X_API_25_x86 &
adb wait-for-device shell 'while [[ -z $(getprop sys.boot_completed) ]]; do sleep 1; done'

# Start appium
appium &
sleep 20

# Test
py.test $GITHUB_EXPLORER_SOURCE_DIR/e2e/android_tests.py

# Clean up
adb emu kill

#############
# IOS TESTS #
#############

# Install dependencies
cd $GITHUB_EXPLORER_SOURCE_DIR/ios
gem install bundler && bundle update 
bundle install && bundle update fastlane

# Build and deploy
bundle exec fastlane ios build
cp -R /tmp/githubExplorer-output/Build/Products/Release-iphonesimulator/githubExplorer.app $GITHUB_EXPLORER_SOURCE_DIR/e2e/artifacts

# Test
py.test $GITHUB_EXPLORER_SOURCE_DIR/e2e/ios_tests.py

# Clean up
killall "appium"
killall "Simulator"
