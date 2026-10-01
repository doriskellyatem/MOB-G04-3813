import { useEffect, useMemo, useRef } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { EvidencePicker } from '../components/EvidencePicker';
import { Field } from '../components/Field';
import { CATEGORIES } from '../data/marketZones';
import { normalizeStallCode, validateInspection } from '../lib/validation';
import { useInspection } from '../state/InspectionProvider';
import { colors } from '../theme/colors';
import type { RiskLevel } from '../types';

export function InspectionFormScreen({ navigation }: { navigation: any }) {
  const { state, setDraft, markAttempted, setMediaBanner } = useInspection();
  const attemptedRef = useRef(state.attemptedSubmit);

  useEffect(() => {
    attemptedRef.current = state.attemptedSubmit;
  }, [state.attemptedSubmit]);

  const validation = useMemo(() => validateInspection(state.draft), [state.draft]);

  const onContinue = () => {
    markAttempted(true);
    if (validation.ok) {
      navigation.navigate('InspectionReview');
    }
  };

  const getRiskTone = (risk: RiskLevel) => {
    return {
      Low: { background: colors.forest, text: colors.paperElevated },
      Medium: { background: colors.clay, text: colors.paperElevated },
      High: { background: colors.brick, text: colors.paperElevated },
    }[risk];
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.container}>
      <Text style={styles.kicker}>Inspection form</Text>
      <Text style={styles.title}>Field verification</Text>

      <Field label="Vendor alias" error={state.attemptedSubmit ? validation.errors.vendorAlias : undefined}>
        <TextInput
          value={state.draft.vendorAlias}
          onChangeText={(value) => setDraft({ vendorAlias: value })}
          placeholder="e.g. Mukamana S."
          inputMode="text"
          autoCapitalize="words"
          style={styles.input}
        />
      </Field>

      <Field label="Stall code" error={state.attemptedSubmit ? validation.errors.stallCode : undefined}>
        <TextInput
          value={state.draft.stallCode}
          onChangeText={(value) => setDraft({ stallCode: normalizeStallCode(value) })}
          placeholder="MSZ-A12"
          autoCapitalize="characters"
          style={styles.input}
        />
      </Field>

      <Field label="Category" error={state.attemptedSubmit ? validation.errors.category : undefined}>
        <View style={styles.chipRow}>
          {CATEGORIES.map((category) => {
            const active = state.draft.category === category;
            return (
              <Pressable
                key={category}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                onPress={() => setDraft({ category })}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{category}</Text>
              </Pressable>
            );
          })}
        </View>
      </Field>

      <Field label="Contact number" error={state.attemptedSubmit ? validation.errors.contactNumber : undefined}>
        <TextInput
          value={state.draft.contactNumber}
          onChangeText={(value) => setDraft({ contactNumber: value })}
          placeholder="0788 123 456"
          keyboardType="phone-pad"
          style={styles.input}
        />
      </Field>

      <Field label="Risk level" error={state.attemptedSubmit ? validation.errors.riskLevel : undefined}>
        <View style={styles.segmentedWrap}>
          {(['Low', 'Medium', 'High'] as const).map((risk) => {
            const active = state.draft.riskLevel === risk;
            const tone = getRiskTone(risk);
            return (
              <Pressable
                key={risk}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                onPress={() => setDraft({ riskLevel: risk })}
                style={[
                  styles.segmentedButton,
                  active && {
                    backgroundColor: tone.background,
                    borderColor: tone.background,
                  },
                  !active && styles.segmentedNeutral,
                ]}
              >
                <Text style={[styles.segmentedText, active && { color: tone.text }]}>{risk}</Text>
              </Pressable>
            );
          })}
        </View>
      </Field>

      <Field label="Consent" error={state.attemptedSubmit ? validation.errors.consent : undefined}>
        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: state.draft.consent }}
          onPress={() => setDraft({ consent: !state.draft.consent })}
          style={styles.checkboxRow}
        >
          <View style={[styles.checkbox, state.draft.consent && styles.checkboxChecked]}>
            {state.draft.consent ? <Text style={styles.checkmark}>✓</Text> : null}
          </View>
          <View style={styles.checkboxTextWrap}>
            <Text style={styles.checkboxTitle}>Consent to review and save this stall inspection</Text>
            <Text style={styles.checkboxBody}>I confirm the recorded details reflect the live field assessment.</Text>
          </View>
        </Pressable>
      </Field>

      <EvidencePicker />

      <Pressable accessibilityRole="button" onPress={onContinue} style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Review inspection</Text>
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
  input: {
    backgroundColor: colors.paperElevated,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 48,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.ink,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.paperElevated,
    borderRadius: 999,
    minHeight: 40,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  chipActive: {
    backgroundColor: colors.forest,
    borderColor: colors.forest,
  },
  chipText: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: '700',
  },
  chipTextActive: {
    color: colors.paperElevated,
  },
  segmentedWrap: {
    flexDirection: 'row',
    gap: 8,
  },
  segmentedButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentedNeutral: {
    backgroundColor: colors.paperElevated,
  },
  segmentedText: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '700',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    minHeight: 52,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.forest,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.forest,
  },
  checkmark: {
    color: colors.paperElevated,
    fontSize: 14,
    fontWeight: '700',
  },
  checkboxTextWrap: {
    flex: 1,
    gap: 2,
  },
  checkboxTitle: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '700',
  },
  checkboxBody: {
    fontSize: 12,
    lineHeight: 18,
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
