import { StyleSheet, Text, View } from 'react-native';

import type { InspectionPriority } from '../types';
import { colors } from '../theme/colors';

type PriorityBadgeProps = {
  priority: InspectionPriority;
};

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const palette = {
    High: { color: colors.brick, backgroundColor: colors.brickSoft, borderColor: colors.brick },
    Medium: { color: colors.clay, backgroundColor: colors.claySoft, borderColor: colors.clay },
    Low: { color: colors.forest, backgroundColor: colors.forestSoft, borderColor: colors.forest },
  }[priority];

  return (
    <View style={[styles.badge, { backgroundColor: palette.backgroundColor, borderColor: palette.borderColor }]}>
      <Text style={[styles.text, { color: palette.color }]}>{priority} priority</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'none',
  },
});
