# my-outfit-app

My Outfit App is a proof of concept (POC) of a mobile application where you are able to digitalize your closet and plan your outfits. The goal of the POC was to validate a simple and low-cost technology stack. The requirements given for the solution was that everything needed to be run in the cloud and the same codebase should provide applications for both Android and iOS.

## Technology stack
The chosen technology stack was to use React Native for developing the mobile applications and use Amazon web services (AWS) as the backend. The data is stored in MongoDB and fetched through a GraphQL interface. Images are stored in S3 buckets. Cognito is used for Authentication and Pinpoint is used as the analytics service. The Detox end-to-end testing framework is used in parallell with Jest unit tests. CI pipeline is created in Bitrise.

## Trello board
https://trello.com/b/sT65u3wc/my-outfit

## CI
https://app.bitrise.io/app/4984a1f54e930a90#/builds


