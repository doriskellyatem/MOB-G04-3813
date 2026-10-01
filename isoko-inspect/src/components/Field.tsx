import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { colors } from '../theme/colors';

type FieldProps = {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
};

export function Field({ label, hint, error, children, containerStyle }: FieldProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.headerRow}>
        <Text style={styles.label}>{label}</Text>
        {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      </View>
      {children}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.ink,
  },
  hint: {
    fontSize: 12,
    color: colors.inkMuted,
  },
  error: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.brick,
  },
});
