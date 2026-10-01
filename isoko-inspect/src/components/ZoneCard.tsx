import { StyleSheet, Text, View } from 'react-native';

import type { MarketZone } from '../types';
import { colors } from '../theme/colors';

type ZoneCardProps = {
  zone: MarketZone;
  onUseStall: (code: string, category: MarketZone['category']) => void;
};

export function ZoneCard({ zone }: ZoneCardProps) {
  const initial = zone.name.charAt(0).toUpperCase();

  return (
    <View style={styles.card}>
      <View style={[styles.hero, { backgroundColor: zone.tint }]}>
        <View style={styles.codePill}>
          <Text style={styles.codeText}>{zone.stallCode}</Text>
        </View>
        <Text style={styles.initial}>{initial}</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.name}>{zone.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.paperElevated,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: 16,
  },
  hero: {
    height: 120,
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: 'flex-end',
  },
  initial: {
    position: 'absolute',
    right: 18,
    top: 18,
    fontSize: 64,
    fontWeight: '800',
    color: 'rgba(255,252,246,0.9)',
  },
  codePill: {
    backgroundColor: 'rgba(16, 43, 34, 0.32)',
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  codeText: {
    color: colors.paperElevated,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  body: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.ink,
    lineHeight: 24,
  },
});
