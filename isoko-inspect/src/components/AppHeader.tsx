import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';

import { colors } from '../theme/colors';

const GROUP_CODE = 'MOB-G04 3813';

export function AppHeader() {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>GROUP4</Text>
        <Text style={styles.subtitle}>MUSANZE SAFE MARKETS</Text>
      </View>
      <View style={styles.pill}>
        <Text style={styles.pillText}>{GROUP_CODE}</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.forest,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.paperElevated,
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  subtitle: {
    color: colors.paperElevated,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    opacity: 0.92,
    marginTop: 4,
  },
  pill: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
  },
    
  pillText: {
    color: colors.paperElevated,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
});
