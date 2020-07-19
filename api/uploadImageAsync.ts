import * as Random from "expo-random";
import { v4 as uuidv4 } from "uuid";
import firebase from "./firebase";

export default async function uploadImageAsync(uri: string): Promise<string> {
  // We need to use XMLHttpRequest here. See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob: Blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.error(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref("images")
    .child(uuidv4({ random: await Random.getRandomBytesAsync(16) }));
  const snapshot = await ref.put(blob);

  // @ts-ignore
  blob.close();

  return await snapshot.ref.getDownloadURL();
}
