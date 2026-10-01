import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';

export function CameraScreen() {
  const [preview, setPreview] = useState<string | null>(null);

  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.8,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      setPreview(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      setPreview(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.kicker}>Camera</Text>
      <Text style={styles.title}>Field evidence</Text>
      <Text style={styles.copy}>Capture product, stall, or signage photos for the inspection report.</Text>

      {preview ? (
        <>
          <Image source={{ uri: preview }} style={styles.preview} />
          <View style={styles.actionRow}>
            <Pressable style={styles.action} onPress={openCamera}>
              <Text style={styles.actionText}>Retake</Text>
            </Pressable>
            <Pressable style={styles.secondaryAction} onPress={openGallery}>
              <Text style={styles.secondaryActionText}>Gallery</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <View style={styles.actionRow}>
          <Pressable style={styles.action} onPress={openCamera}>
            <Text style={styles.actionText}>Capture photo</Text>
          </Pressable>
          <Pressable style={styles.secondaryAction} onPress={openGallery}>
            <Text style={styles.secondaryActionText}>Choose gallery</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 28,
    backgroundColor: colors.paper,
  },
  kicker: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.inkSubtle,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: -0.6,
    color: colors.ink,
    marginTop: 8,
  },
  copy: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.inkMuted,
    marginTop: 12,
  },
  preview: {
    width: '100%',
    height: 220,
    borderRadius: 18,
    marginTop: 20,
    backgroundColor: colors.border,
  },
  actionRow: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  action: {
    flex: 1,
    minHeight: 48,
    backgroundColor: colors.forest,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    color: colors.paperElevated,
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryAction: {
    flex: 1,
    minHeight: 48,
    backgroundColor: colors.paperElevated,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryActionText: {
    color: colors.forest,
    fontSize: 16,
    fontWeight: '700',
  },
});
