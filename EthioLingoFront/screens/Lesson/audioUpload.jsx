import React, { useState } from "react";
import { View, Button, Text, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dg6zm0aeo/upload"; // Replace with your Cloudinary cloud name
const CLOUDINARY_UPLOAD_PRESET = "ethiolingo-audio-upload"; 
export default function App() {
  const [audioUrl, setAudioUrl] = useState("");

  const uploadAudio = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/*", // Allow only audio files
      });

      if (!result.assets || result.assets.length === 0) {
        Alert.alert("Upload canceled", "No file was selected.");
        return;
      }

      const formData = new FormData();
      formData.append("file", {
        uri: result.assets[0].uri,
        type: result.assets[0].mimeType || "audio/mpeg",
        name: result.assets[0].name || "audio.mp3",
      });
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Cloudinary Response:", data); // Debugging

      if (data.error) {
        throw new Error(data.error.message);
      }

      if (!data.secure_url) {
        throw new Error("Upload failed. No URL returned.");
      }

      setAudioUrl(data.secure_url);
      console.log("Uploaded Audio URL:", data.secure_url);
    } catch (error) {
      Alert.alert("Upload Error", error.message);
      console.error("Upload error:", error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Upload Audio" onPress={uploadAudio} />
      {audioUrl ? <Text>Audio URL: {audioUrl}</Text> : null}
    </View>
  );
}
