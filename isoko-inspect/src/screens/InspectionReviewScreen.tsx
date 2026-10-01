import { useEffect, useRef } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, Image } from 'react-native';

import { kigaliStamp, validateInspection } from '../lib/validation';
import { useInspection } from '../state/InspectionProvider';
import { colors } from '../theme/colors';

export function InspectionReviewScreen({ navigation }: { navigation: any }) {
  const { state, saveInspection } = useInspection();
  const savingRef = useRef(false);

  useEffect(() => {
    if (!validateInspection(state.draft).ok && !savingRef.current) {
      navigation.goBack();
    }
  }, [navigation, state.draft]);

  const onSave = () => {
    savingRef.current = true;
    const record = saveInspection();
    if (!record) {
      savingRef.current = false;
      return;
    }

    navigation.getParent()?.navigate('RecordsTab', {
      screen: 'InspectionDetails',
      params: { id: record.id },
    });
  };

  const metadata = [
    { label: 'Vendor alias', value: state.draft.vendorAlias },
    { label: 'Stall code', value: state.draft.stallCode },
    { label: 'Category', value: state.draft.category || '—' },
    { label: 'Contact number', value: state.draft.contactNumber },
    { label: 'Risk level', value: state.draft.riskLevel || '—' },
    { label: 'Consent', value: state.draft.consent ? 'Granted' : 'Not granted' },
    { label: 'Timestamp', value: kigaliStamp(new Date().toISOString()) },
    { label: 'Group code', value: 'MOB-G04 3813' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.kicker}>Inspection review</Text>
      <Text style={styles.title}>Verify before save</Text>

      <View style={styles.card}>
        {metadata.map((item) => (
          <View key={item.label} style={styles.row}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Evidence</Text>
        {state.draft.evidenceUri ? (
          <Image source={{ uri: state.draft.evidenceUri }} style={styles.image} />
        ) : (
          <Text style={styles.empty}>No evidence attached.</Text>
        )}
      </View>

      <View style={styles.actionRow}>
        <Pressable accessibilityRole="button" onPress={() => navigation.goBack()} style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Edit form</Text>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={onSave} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Save record</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 16,
  },
  kicker: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.inkSubtle,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: colors.ink,
  },
  card: {
    backgroundColor: colors.paperElevated,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.inkMuted,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.ink,
    flexShrink: 1,
    textAlign: 'right',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.ink,
  },
  empty: {
    fontSize: 14,
    color: colors.inkMuted,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 18,
    backgroundColor: colors.border,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: colors.forest,
    borderRadius: 999,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: colors.paperElevated,
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    flex: 1,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.forest,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: colors.forest,
    fontSize: 16,
    fontWeight: '700',
  },
});
