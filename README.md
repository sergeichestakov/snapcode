# snapcode

<p align="center">
  <a aria-label="snapcode" href="https://twitter.com/SergeiChestakov/status/1289726580210561025?s=20" target="_blank">
    <img src="assets/snapcode.png" width="300" height="300" />
  </a>
</p>

### About

Expo app that allows you to take a picture of handwritten code and execute it on [Repl.it](https://repl.it). Watch the demo [here](https://twitter.com/SergeiChestakov/status/1289726580210561025?s=20).

Logo credit: [@Vandesm14](https://twitter.com/Vandesm14).

### Setup
1. Get a [Google Cloud Vision API Key](https://cloud.google.com/vision/docs/before-you-begin).
2. Get a [Repl.it API Key](https://devs.turbio.repl.co/).
3. Create a `.env` file with the following fields:
```bash
GOOGLE_CLOUD_VISION_API_KEY='${YOUR_KEY_HERE}'
REPLIT_API_KEY='${YOUR_KEY_HERE}'
```
4. Make sure you have `expo-cli` installed. If you don't you can install it via:
```bash
npm install -g expo-cli
```

5. From there you can just:
```bash
# Install dependencies
yarn install

# Run the app
expo start
```
