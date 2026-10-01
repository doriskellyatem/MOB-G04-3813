import { Pressable, ScrollView, StyleSheet, Text, View, Image } from 'react-native';

import { kigaliStamp } from '../lib/validation';
import { useInspection } from '../state/InspectionProvider';
import { colors } from '../theme/colors';

export function InspectionDetailsScreen({ route, navigation }: any) {
  const { state } = useInspection();
  const record = state.records.find((item: any) => item.id === route.params.id);

  if (!record) {
    return (
      <View style={styles.emptyWrap}>
        <Text style={styles.empty}>Inspection not found.</Text>
        <Pressable accessibilityRole="button" onPress={() => navigation.goBack()} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Back</Text>
        </Pressable>
      </View>
    );
  }

  const rows = [
    { label: 'Vendor alias', value: record.vendorAlias },
    { label: 'Stall code', value: record.stallCode },
    { label: 'Category', value: record.category },
    { label: 'Contact', value: record.contactNumber },
    { label: 'Risk', value: record.riskLevel },
    { label: 'Consent', value: record.consent ? 'Granted' : 'Not granted' },
    { label: 'Saved at', value: kigaliStamp(record.createdAt) },
    { label: 'Group code', value: record.groupCode },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.kicker}>Record detail</Text>
      <Text style={styles.title}>{record.vendorAlias}</Text>

      <View style={styles.card}>
        {rows.map((row) => (
          <View key={row.label} style={styles.row}>
            <Text style={styles.label}>{row.label}</Text>
            <Text style={styles.value}>{row.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Evidence</Text>
        {record.evidenceUri ? (
          <Image source={{ uri: record.evidenceUri }} style={styles.image} />
        ) : (
          <Text style={styles.empty}>No evidence attached.</Text>
        )}
      </View>

      <Pressable accessibilityRole="button" onPress={() => navigation.goBack()} style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Back to records</Text>
      </Pressable>
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
  emptyWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  image: {
    width: '100%',
    height: 200,
    borderRadius: 18,
    backgroundColor: colors.border,
  },
  empty: {
    fontSize: 14,
    color: colors.inkMuted,
  },
  primaryButton: {
    backgroundColor: colors.forest,
    borderRadius: 999,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  primaryButtonText: {
    color: colors.paperElevated,
    fontSize: 16,
    fontWeight: '700',
  },
});
