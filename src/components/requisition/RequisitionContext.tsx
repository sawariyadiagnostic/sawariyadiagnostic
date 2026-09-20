import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react';
import { requisitionTests, compileRequisitionManifest } from '@/data/requisitionCatalog';
import type { PatientDetails, PathologyDepartment, RequisitionCatalogTest } from '@/types/requisition';

interface State {
  selectedIds: string[];
  patient: PatientDetails;
  drawerOpen: boolean;
  department: PathologyDepartment;
  query: string;
}

type Action =
  | { type: 'toggle'; id: string }
  | { type: 'remove'; id: string }
  | { type: 'clear' }
  | { type: 'drawer'; open: boolean }
  | { type: 'department'; value: PathologyDepartment }
  | { type: 'query'; value: string }
  | { type: 'patient'; value: Partial<PatientDetails> }
  | { type: 'hydrate'; value: Partial<State> };

const initialPatient: PatientDetails = {
  fullName: '',
  phone: '',
  age: '',
  gender: '',
  address: '',
  landmark: '',
  pinCode: '127306',
  preferredDate: '',
  preferredSlot: '',
};

const initialState: State = { selectedIds: [], patient: initialPatient, drawerOpen: false, department: 'ALL', query: '' };
const STORAGE_KEY = 'SAWARIYA_REQUISITION_DRAFT_V1';

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'toggle': return { ...state, selectedIds: state.selectedIds.includes(action.id) ? state.selectedIds.filter((id) => id !== action.id) : [...state.selectedIds, action.id] };
    case 'remove': return { ...state, selectedIds: state.selectedIds.filter((id) => id !== action.id) };
    case 'clear': return { ...state, selectedIds: [] };
    case 'drawer': return { ...state, drawerOpen: action.open };
    case 'department': return { ...state, department: action.value };
    case 'query': return { ...state, query: action.value };
    case 'patient': return { ...state, patient: { ...state.patient, ...action.value } };
    case 'hydrate': return { ...state, ...action.value, drawerOpen: false, patient: { ...state.patient, ...(action.value.patient || {}) } };
    default: return state;
  }
}

interface RequisitionContextValue {
  state: State;
  catalog: RequisitionCatalogTest[];
  selectedTests: RequisitionCatalogTest[];
  filteredTests: RequisitionCatalogTest[];
  manifest: ReturnType<typeof compileRequisitionManifest>;
  toggleTest: (id: string) => void;
  removeTest: (id: string) => void;
  clear: () => void;
  setDrawerOpen: (open: boolean) => void;
  setDepartment: (value: PathologyDepartment) => void;
  setQuery: (value: string) => void;
  updatePatient: (value: Partial<PatientDetails>) => void;
}

const RequisitionContext = createContext<RequisitionContextValue | undefined>(undefined);

export function RequisitionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) dispatch({ type: 'hydrate', value: JSON.parse(saved) });
    } catch {
      // Draft persistence is optional; a malformed draft must not block the catalog.
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ selectedIds: state.selectedIds, patient: state.patient }));
    } catch {
      // Private browsing and storage limits are supported by continuing without a draft.
    }
  }, [state.selectedIds, state.patient]);

  const selectedTests = useMemo(() => requisitionTests.filter((test) => state.selectedIds.includes(test.id)), [state.selectedIds]);
  const manifest = useMemo(() => compileRequisitionManifest(selectedTests), [selectedTests]);
  const filteredTests = useMemo(() => {
    const query = state.query.trim().toLowerCase();
    return requisitionTests.filter((test) => {
      const departmentMatch = state.department === 'ALL' || test.department === state.department;
      if (!query) return departmentMatch;
      const haystack = [test.name, test.description, test.id, ...(test.parameters || []), ...test.aliases].join(' ').toLowerCase();
      return departmentMatch && haystack.includes(query);
    });
  }, [state.department, state.query]);

  return (
    <RequisitionContext.Provider value={{
      state, catalog: requisitionTests, selectedTests, filteredTests, manifest,
      toggleTest: (id) => dispatch({ type: 'toggle', id }),
      removeTest: (id) => dispatch({ type: 'remove', id }),
      clear: () => dispatch({ type: 'clear' }),
      setDrawerOpen: (open) => dispatch({ type: 'drawer', open }),
      setDepartment: (value) => dispatch({ type: 'department', value }),
      setQuery: (value) => dispatch({ type: 'query', value }),
      updatePatient: (value) => dispatch({ type: 'patient', value }),
    }}>
      {children}
    </RequisitionContext.Provider>
  );
}

export function useRequisition() {
  const context = useContext(RequisitionContext);
  if (!context) throw new Error('useRequisition must be used inside RequisitionProvider');
  return context;
}
