#!/usr/bin/env bash -e

INFOPLIST_FILE="Info.plist"
INFOPLIST_DIR="$(pwd)/ios/githubExplorer/${INFOPLIST_FILE}"

PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')

BUILD_NUMBER=$(git rev-list master --first-parent --count)

# Update plist with new values
/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString ${PACKAGE_VERSION#*v}" "${INFOPLIST_DIR}"
/usr/libexec/PlistBuddy -c "Set :CFBundleVersion $BUILD_NUMBER" "${INFOPLIST_DIR}"

git add "${INFOPLIST_DIR}"