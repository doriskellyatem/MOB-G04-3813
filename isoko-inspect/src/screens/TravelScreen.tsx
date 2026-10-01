import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';

const groupMembers = [
  { name: 'Khalil Abdeen Hamid Musa', role: 'works as member 4' },
  { name: 'Tuyisingize Dieudonne', role: 'works as member 3' },
  { name: 'Doris-Kelly Atemnkeng', role: 'works on number 5 group leader' },
  { name: 'Haroun Mohammed', role: 'works as member 2' },
  { name: 'Mohammed Bashier Ahmed', role: 'works as member 1' },
];

export function TravelScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.kicker}>Travel</Text>
      <Text style={styles.title}>Route progress</Text>
      <Text style={styles.copy}>Track your market route, next stops, and coverage across Musanze safe markets.</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today's route</Text>
        <Text style={styles.cardValue}>Kimonyi → Muhoza → Cyuve</Text>
      </View>

      <View style={styles.membersCard}>
        <Text style={styles.membersTitle}>Group members and roles</Text>
        {groupMembers.map((member) => (
          <View key={member.name} style={styles.memberRow}>
            <Text style={styles.memberName}>{member.name}</Text>
            <Text style={styles.memberRole}>{member.role}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 28,
    backgroundColor: colors.paper,
  },
  kicker: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.inkSubtle,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: -0.6,
    color: colors.ink,
    marginTop: 8,
  },
  copy: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.inkMuted,
    marginTop: 12,
  },
  card: {
    marginTop: 24,
    backgroundColor: colors.paperElevated,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.inkSubtle,
  },
  cardValue: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '700',
    color: colors.ink,
  },
  membersCard: {
    marginTop: 20,
    backgroundColor: colors.paperElevated,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  membersTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.ink,
    marginBottom: 12,
  },
  memberRow: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  memberName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.ink,
  },
  memberRole: {
    marginTop: 4,
    fontSize: 13,
    color: colors.inkMuted,
  },
});
S