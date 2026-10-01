import { useMemo } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { EmptyState } from '../components/EmptyState';
import { ZoneCard } from '../components/ZoneCard';
import { MARKET_ZONES, STATUS_FILTERS } from '../data/marketZones';
import { useInspection } from '../state/InspectionProvider';
import { colors } from '../theme/colors';
import type { MarketZone } from '../types';

export function HomeScreen({ navigation }: { navigation: any }) {
  const { state, setDraft, setFilters, setShowEmptyCatalog } = useInspection();

  const visibleZones = useMemo(() => {
    const query = state.filters.query.trim().toLowerCase();
    return MARKET_ZONES.filter((zone) => {
      const matchesQuery =
        query.length === 0 ||
        zone.name.toLowerCase().includes(query) ||
        zone.stallCode.toLowerCase().includes(query) ||
        zone.category.toLowerCase().includes(query);

      const matchesStatus = state.filters.status === 'All' || zone.status === state.filters.status;
      return matchesQuery && matchesStatus;
    });
  }, [state.filters]);

  const handleUseStall = (stallCode: string, category: MarketZone['category']) => {
    setDraft({ stallCode, category });
    navigation.navigate('InspectTab', { screen: 'InspectionForm' });
  };

  const resetCatalog = () => {
    setFilters({ query: '', status: 'All' });
    setShowEmptyCatalog(false);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.kicker}>Assigned zones · 30 Sep 2026</Text>
      <Text style={styles.title}>Musanze market catalogue</Text>
      <Text style={styles.lede}>
        Six active market zones are under inspection review. Use the catalog below to focus on sites with hygiene, safety, or compliance risks.
      </Text>

      <View style={styles.searchBox}>
        <TextInput
          value={state.filters.query}
          onChangeText={(value) => setFilters({ ...state.filters, query: value })}
          placeholder="Search market or stall code"
          placeholderTextColor={colors.inkSubtle}
          style={styles.input}
        />
      </View>

      <View style={styles.filterRow}>
        {STATUS_FILTERS.map((status) => {
          const active = state.filters.status === status;
          return (
            <Pressable
              key={status}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              onPress={() => setFilters({ ...state.filters, status })}
              style={[styles.filterChip, active && styles.filterChipActive]}
            >
              <Text style={[styles.filterText, active && styles.filterTextActive]}>{status}</Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: state.showEmptyCatalog }}
        onPress={() => setShowEmptyCatalog(!state.showEmptyCatalog)}
        style={styles.checkboxRow}
      >
        <View style={[styles.checkbox, state.showEmptyCatalog && styles.checkboxChecked]}>
          {state.showEmptyCatalog ? <Text style={styles.checkmark}>✓</Text> : null}
        </View>
        <Text style={styles.checkboxLabel}>Show empty catalogue</Text>
      </Pressable>

      {state.showEmptyCatalog ? (
        <EmptyState
          title="Catalogue empty"
          body="No stalls match the current filters. Clear them and return to the active market list."
          buttonLabel="Clear filters"
          onPress={resetCatalog}
        />
      ) : visibleZones.length === 0 ? (
        <EmptyState
          title="No matching stalls"
          body="Try a different search query or status filter to reopen the list."
          buttonLabel="Clear filters"
          onPress={resetCatalog}
        />
      ) : (
        visibleZones.map((zone) => (
          <ZoneCard key={zone.id} zone={zone} onUseStall={handleUseStall} />
        ))
      )}
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
    letterSpacing: 1.3,
    textTransform: 'uppercase',
    color: colors.inkSubtle,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: -0.7,
    color: colors.ink,
  },
  lede: {
    fontSize: 15,
    lineHeight: 23,
    color: colors.inkMuted,
  },
  searchBox: {
    backgroundColor: colors.paperElevated,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  input: {
    height: 48,
    paddingHorizontal: 14,
    fontSize: 14,
    color: colors.ink,
    backgroundColor: colors.paperElevated,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 2,
  },
  filterChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.paperElevated,
    minHeight: 34,
    paddingHorizontal: 14,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterChipActive: {
    backgroundColor: colors.forest,
    borderColor: colors.forest,
  },
  filterText: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: '700',
  },
  filterTextActive: {
    color: colors.paperElevated,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 40,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.paperElevated,
  },
  checkboxChecked: {
    backgroundColor: colors.forest,
    borderColor: colors.forest,
  },
  checkmark: {
    color: colors.paperElevated,
    fontSize: 12,
    fontWeight: '700',
  },
  checkboxLabel: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '600',
  },
});
