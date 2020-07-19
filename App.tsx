import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Camera } from "expo-camera";
import uploadImageAsync from "./api/uploadImageAsync";
import extractTextFromImage from "./api/extractTextFromImage";

export default function App() {
  const [hasPermission, setHasPermission] = React.useState<boolean | null>(
    null
  );
  const [type, setType] = React.useState(Camera.Constants.Type.back);
  const [processingImage, setProcessingImage] = React.useState<boolean>(false);
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
    return <Text>No access to camera</Text>;
  }

  if (processingImage) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
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
              if (camera) {
                setProcessingImage(true);
                const { uri } = await camera.takePictureAsync();
                console.log("uploading ", uri);
                const downloadURL = await uploadImageAsync(uri);
                console.log("download URL: ", downloadURL);
                const text = await extractTextFromImage(downloadURL);
                console.log("received text: ", text);
                setProcessingImage(false);
              }
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
