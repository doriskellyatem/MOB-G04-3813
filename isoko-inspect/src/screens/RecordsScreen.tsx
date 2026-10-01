import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';

import { EmptyState } from '../components/EmptyState';
import { useInspection } from '../state/InspectionProvider';
import { colors } from '../theme/colors';
import { kigaliStamp } from '../lib/validation';

export function RecordsScreen({ navigation }: { navigation: any }) {
  const { state } = useInspection();

  if (state.records.length === 0) {
    return (
      <View style={styles.emptyWrap}>
        <EmptyState title="No inspections yet" body="Use the Inspect tab to save a fresh field record." />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.kicker}>Records</Text>
      <Text style={styles.title}>Inspection log</Text>
      <View style={styles.groupRow}>
        <Text style={styles.groupLabel}>Group code</Text>
        <Text style={styles.groupCode}>MOB-G04 3813</Text>
      </View>

      {state.records.map((record) => (
        <Pressable
          key={record.id}
          accessibilityRole="button"
          onPress={() => navigation.navigate('InspectionDetails', { id: record.id })}
          style={styles.card}
        >
          <Text style={styles.vendor}>{record.vendorAlias}</Text>
          <Text style={styles.meta}>{record.stallCode} · {record.category}</Text>
          <Text style={styles.meta}>{kigaliStamp(record.createdAt)} · {record.riskLevel} risk</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  emptyWrap: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
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
  groupRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.paperElevated,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  groupLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.inkSubtle,
  },
  groupCode: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.forest,
  },
  card: {
    backgroundColor: colors.paperElevated,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 6,
  },
  vendor: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.ink,
  },
  meta: {
    fontSize: 14,
    color: colors.inkMuted,
  },
});
