import { StyleSheet, Text, View } from 'react-native';

import type { StallStatus } from '../types';
import { colors } from '../theme/colors';

type StatusChipProps = { status: StallStatus };

export function StatusChip({ status }: StatusChipProps) {
  const palette = {
    Open: { backgroundColor: colors.forestSoft, color: colors.forest },
    Attention: { backgroundColor: colors.claySoft, color: colors.clay },
    Closed: { backgroundColor: colors.brickSoft, color: colors.brick },
  }[status];

  return (
    <View style={[styles.chip, { backgroundColor: palette.backgroundColor }]}>
      <Text style={[styles.text, { color: palette.color }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minHeight: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
  },
});
