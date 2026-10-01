import * as ImagePicker from 'expo-image-picker';
import { Alert, Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { useInspection } from '../state/InspectionProvider';
import { colors } from '../theme/colors';


export function EvidencePicker() {
  const { state, setEvidence, setMediaBanner } = useInspection();

    
  const openCamera = async () => {
    const cameraPermission = await ImagePicker.getCameraPermissionsAsync();
    if (cameraPermission.status !== 'granted') {
      const result = await ImagePicker.requestCameraPermissionsAsync();
      if (result.status !== 'granted') {
        setMediaBanner({
          tone: 'denied',
          title: 'Camera access denied',
          body: 'Camera access is needed to capture field evidence. Please allow access in settings.',
        });
        return;
      }
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.7,
      allowsEditing: true,
    });

    if (result.canceled) {
      setMediaBanner({
        tone: 'cancelled',
        title: 'Photo capture cancelled',
        body: 'No photo was captured. You can try again or choose a gallery image instead.',
      });
      return;
    }

    const uri = result.assets[0]?.uri ?? null;
    setEvidence(uri);
    setMediaBanner({
      tone: 'info',
      title: 'Evidence attached',
      body: 'The photo is now saved to this inspection draft.',
    });
  };

  const openGallery = async () => {
    const permission = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (permission.status !== 'granted') {
      const requested = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (requested.status !== 'granted') {
        setMediaBanner({
          tone: 'denied',
          title: 'Gallery access denied',
          body: 'Gallery access is needed to attach evidence. Please allow access in settings.',
        });
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
      allowsEditing: true,
    });

    if (result.canceled) {
      setMediaBanner({
        tone: 'cancelled',
        title: 'Gallery selection cancelled',
        body: 'No image was selected. You can try again when ready.',
      });
      return;
    }

    const uri = result.assets[0]?.uri ?? null;
    setEvidence(uri);
    setMediaBanner({
      tone: 'info',
      title: 'Evidence attached',
      body: 'The selected image is now attached to the inspection.',
    });
  };

  const renderBanner = () => {
    if (!state.mediaBanner) return null;
    const { tone, title, body } = state.mediaBanner;

    const palette =
      tone === 'denied'
        ? { background: '#F4DADA', text: colors.brick, border: colors.brick }
        : tone === 'cancelled'
          ? { background: '#F6EAD0', text: colors.clay, border: colors.clay }
          : { background: '#DDEFE3', text: colors.forest, border: colors.forest };

    return (
      <View style={[styles.banner, { backgroundColor: palette.background, borderColor: palette.border }]}>
        <Text style={[styles.bannerTitle, { color: palette.text }]}>{title}</Text>
        <Text style={[styles.bannerBody, { color: palette.text }]}>{body}</Text>
        {tone === 'denied' ? (
          <View style={styles.bannerActions}>
            <Pressable
              accessibilityRole="button"
              onPress={openCamera}
            >
              <Text style={[styles.bannerLink, { color: palette.text }]}>Try camera again</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={() => Linking.openSettings()}
            >
              <Text style={[styles.bannerLink, { color: palette.text }]}>Open settings</Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Evidence</Text>
      <Text style={styles.lede}>Capture a product, stall, or signage photo to support the report.</Text>

      {state.draft.evidenceUri ? (
        <>
          <Image source={{ uri: state.draft.evidenceUri }} style={styles.preview} />
          <View style={styles.actionRow}>
            <Pressable accessibilityRole="button" onPress={openCamera} style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Replace</Text>
            </Pressable>
            <Pressable accessibilityRole="button" onPress={() => setEvidence(null)} style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Remove</Text>
            </Pressable>
          </View>
          <Pressable accessibilityRole="button" onPress={openGallery}>
            <Text style={styles.link}>Replace from gallery instead</Text>
          </Pressable>
        </>
      ) : (
        <View style={styles.actionRow}>
          <Pressable accessibilityRole="button" onPress={openCamera} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Capture photo</Text>
          </Pressable>
          <Pressable accessibilityRole="button" onPress={openGallery} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Choose gallery</Text>
          </Pressable>
        </View>
      )}

      {renderBanner()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  heading: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.ink,
  },
  lede: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.inkMuted,
  },
  preview: {
    width: '100%',
    height: 180,
    borderRadius: 18,
    backgroundColor: colors.border,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  primaryButton: {
    backgroundColor: colors.forest,
    borderRadius: 999,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  primaryButtonText: {
    color: colors.paperElevated,
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.forest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: colors.forest,
    fontSize: 14,
    fontWeight: '700',
  },
  link: {
    color: colors.forest,
    fontSize: 14,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  banner: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  bannerBody: {
    fontSize: 14,
    lineHeight: 20,
  },
  bannerActions: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 10,
  },
  bannerLink: {
    fontSize: 14,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
