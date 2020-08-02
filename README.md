# snapcode

Expo app that allows you to take a picture of handwritten code and execute it on [Repl.it](https://repl.it).
### Setup
1. Get a [Google Cloud Vision API Key](https://cloud.google.com/vision/docs/before-you-begin).
2. Get a Repl.it [API Key](https://devs.turbio.repl.co/).
3. Create a `.env` file with the following fields:
```bash
GOOGLE_CLOUD_VISION_API_KEY='${YOUR_KEY_HERE}'
REPLIT_API_KEY='${YOUR_KEY_HERE}'
```

4. From there you can just:
```bash
# Install dependencies
yarn install

# Run the app
expo start
```
