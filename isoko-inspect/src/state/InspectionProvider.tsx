import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';

import { formatRwandaPhone, normalizePhone } from '../lib/format';
import { normalizeStallCode, validateInspection } from '../lib/validation';
import type {
  FieldErrors,
  InspectionDraft,
  InspectionFilters,
  InspectionRecord,
  MediaBanner,
} from '../types';

const GROUP_CODE = 'MOB-G04 3813';

const defaultDraft: InspectionDraft = {
  vendorAlias: '',
  stallCode: '',
  category: '',
  contactNumber: '',
  riskLevel: '',
  consent: false,
  evidenceUri: null,
};

export type InspectionState = {
  draft: InspectionDraft;
  records: InspectionRecord[];
  filters: InspectionFilters;
  mediaBanner: MediaBanner | null;
  showEmptyCatalog: boolean;
  attemptedSubmit: boolean;
};

type Action =
  | { type: 'patch'; payload: Partial<InspectionDraft> }
  | { type: 'resetDraft' }
  | { type: 'filters'; payload: InspectionFilters }
  | { type: 'empty'; payload: boolean }
  | { type: 'banner'; payload: MediaBanner | null }
  | { type: 'evidence'; payload: string | null }
  | { type: 'attempt'; payload: boolean }
  | { type: 'save'; payload: InspectionRecord };

const initialState: InspectionState = {
  draft: defaultDraft,
  records: [],
  filters: { query: '', status: 'All' },
  mediaBanner: null,
  showEmptyCatalog: false,
  attemptedSubmit: false,
};

function reducer(state: InspectionState, action: Action): InspectionState {
  switch (action.type) {
    case 'patch':
      return {
        ...state,
        draft: {
          ...state.draft,
          ...action.payload,
        },
      };
    case 'resetDraft':
      return {
        ...state,
        draft: defaultDraft,
        attemptedSubmit: false,
        mediaBanner: null,
      };
    case 'filters':
      return {
        ...state,
        filters: action.payload,
      };
    case 'empty':
      return {
        ...state,
        showEmptyCatalog: action.payload,
      };
    case 'banner':
      return {
        ...state,
        mediaBanner: action.payload,
      };
    case 'evidence':
      return {
        ...state,
        draft: {
          ...state.draft,
          evidenceUri: action.payload,
        },
      };
    case 'attempt':
      return {
        ...state,
        attemptedSubmit: action.payload,
      };
    case 'save':
      return {
        ...state,
        records: [action.payload, ...state.records],
      };
    default:
      return state;
  }
}

type InspectionContextValue = {
  state: InspectionState;
  setDraft: (patch: Partial<InspectionDraft>) => void;
  resetDraft: () => void;
  setFilters: (filters: InspectionFilters) => void;
  setShowEmptyCatalog: (value: boolean) => void;
  setMediaBanner: (banner: MediaBanner | null) => void;
  setEvidence: (uri: string | null) => void;
  markAttempted: (attempted?: boolean) => void;
  saveInspection: () => InspectionRecord | null;
};

const InspectionContext = createContext<InspectionContextValue | undefined>(undefined);

export function InspectionProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setDraft = useCallback((patch: Partial<InspectionDraft>) => {
    dispatch({ type: 'patch', payload: patch });
  }, []);

  const resetDraft = useCallback(() => {
    dispatch({ type: 'resetDraft' });
  }, []);

  const setFilters = useCallback((filters: InspectionFilters) => {
    dispatch({ type: 'filters', payload: filters });
  }, []);

  const setShowEmptyCatalog = useCallback((value: boolean) => {
    dispatch({ type: 'empty', payload: value });
  }, []);

  const setMediaBanner = useCallback((banner: MediaBanner | null) => {
    dispatch({ type: 'banner', payload: banner });
  }, []);

  const setEvidence = useCallback((uri: string | null) => {
    dispatch({ type: 'evidence', payload: uri });
  }, []);

  const markAttempted = useCallback((attempted = true) => {
    dispatch({ type: 'attempt', payload: attempted });
  }, []);

  const saveInspection = useCallback((): InspectionRecord | null => {
    const result = validateInspection(state.draft);
    if (!result.ok) {
      dispatch({ type: 'attempt', payload: true });
      return null;
    }

    const record: InspectionRecord = {
      id: `${Date.now()}`,
      vendorAlias: state.draft.vendorAlias.trim(),
      stallCode: normalizeStallCode(state.draft.stallCode),
      category: state.draft.category,
      contactNumber: formatRwandaPhone(state.draft.contactNumber),
      riskLevel: state.draft.riskLevel,
      consent: state.draft.consent,
      evidenceUri: state.draft.evidenceUri,
      createdAt: new Date().toISOString(),
      groupCode: GROUP_CODE,
    };

    dispatch({ type: 'save', payload: record });
    dispatch({ type: 'resetDraft' });
    return record;
  }, [state.draft]);

  const value = useMemo<InspectionContextValue>(
    () => ({
      state,
      setDraft,
      resetDraft,
      setFilters,
      setShowEmptyCatalog,
      setMediaBanner,
      setEvidence,
      markAttempted,
      saveInspection,
    }),
    [markAttempted, resetDraft, saveInspection, setDraft, setEvidence, setFilters, setMediaBanner, setShowEmptyCatalog, state],
  );

  return <InspectionContext.Provider value={value}>{children}</InspectionContext.Provider>;
}

export function useInspection(): InspectionContextValue {
  const context = useContext(InspectionContext);
  if (!context) {
    throw new Error('useInspection must be used within an InspectionProvider');
  }
  return context;
}

export { GROUP_CODE };
export type { FieldErrors };
export { normalizePhone };
