import * as React from "react";
import {
  Text,
  View,
  Button,
  Linking,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";
import extractTextFromImage from "./api/extractTextFromImage";
import createRepl from "./api/createRepl";

export default function App() {
  const [hasPermission, setHasPermission] = React.useState<boolean | null>(
    null
  );
  const [type, setType] = React.useState(Camera.Constants.Type.back);
  const [processingImage, setProcessingImage] = React.useState<boolean>(false);
  const [imageText, setImageText] = React.useState<string>("");
  let camera: Camera | null = null;

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>Give me camera pls :(</Text>;
  }

  if (processingImage) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (imageText) {
    return (
      <View style={styles.imageTextContainer}>
        <Text style={styles.imageText}>{imageText}</Text>
        <Button title="Reset" onPress={() => setImageText("")} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={(ref) => {
          camera = ref;
        }}
        style={styles.cameraContainer}
        type={type}
      >
        <View style={styles.cameraView}>
          <TouchableOpacity
            style={styles.flipButtonContainer}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={styles.flipButtonText}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={async () => {
              if (!camera) {
                return;
              }

              const { uri } = await camera.takePictureAsync();
              setProcessingImage(true);

              const encoded = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
              });

              const content = await extractTextFromImage(encoded);

              if (content) {
                const files = [
                  {
                    name: "main.py",
                    content,
                  },
                ];
                const repl = await createRepl({ files });

                if (repl) {
                  // url is of the form /@username/slug
                  const url = `https://repl.it${repl.url}`;

                  await Linking.openURL(url);
                }

                setImageText(content);
              }
              setProcessingImage(false);
            }}
          ></TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
  },
  cameraView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "transparent",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageText: {
    fontSize: 20,
    marginBottom: 20,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: "#FFF",
    marginBottom: 50,
  },
  flipButtonContainer: {
    position: "absolute",
    left: 20,
    bottom: 30,
  },
  flipButtonText: {
    fontSize: 32,
    color: "white",
  },
});
