import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';

type EmptyStateProps = {
  title: string;
  body: string;
  buttonLabel?: string;
  onPress?: () => void;
};

export function EmptyState({ title, body, buttonLabel, onPress }: EmptyStateProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      {buttonLabel && onPress ? (
        <Pressable
          accessibilityRole="button"
          onPress={onPress}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{buttonLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.paperElevated,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 24,
    borderStyle: 'dashed',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 180,
  },
  title: {
    fontSize: 20,
    color: colors.ink,
    fontWeight: '700',
    textAlign: 'center',
  },
  body: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 22,
    color: colors.inkMuted,
    textAlign: 'center',
  },
  button: {
    marginTop: 18,
    backgroundColor: colors.forest,
    borderRadius: 999,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  buttonText: {
    color: colors.paperElevated,
    fontSize: 14,
    fontWeight: '700',
  },
});
