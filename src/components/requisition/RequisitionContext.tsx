import { createContext, useContext, useMemo, useReducer, useState, type ReactNode } from 'react';
import { medicalTests, type MedicalTest } from '../../data/publishedCatalog';

const publishedTestIds = new Set(medicalTests.map((test) => test.id));

export function requisitionReducer(ids: string[], action: { type: 'toggle' | 'clear'; testId?: string }) {
  if (action.type === 'clear') return [];
  if (!action.testId || !publishedTestIds.has(action.testId)) return ids;
  return ids.includes(action.testId) ? ids.filter((id) => id !== action.testId) : [...ids, action.testId];
}

const testsById = new Map(medicalTests.map((test) => [test.id, test]));

interface RequisitionValue {
  selectedTests: MedicalTest[];
  isSelected: (testId: string) => boolean;
  toggleTest: (testId: string) => void;
  clearRequest: () => void;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

const RequisitionContext = createContext<RequisitionValue | null>(null);

export function RequisitionProvider({ children }: { children: ReactNode }) {
  const [selectedIds, dispatch] = useReducer(requisitionReducer, [] as string[]);
  const [isOpen, setOpen] = useState(false);
  const value = useMemo(() => {
    const selected = new Set(selectedIds);
    return {
      selectedTests: selectedIds.flatMap((id) => {
        const item = testsById.get(id);
        return item ? [item] : [];
      }),
      isSelected: (testId: string) => selected.has(testId),
      toggleTest: (testId: string) => dispatch({ type: 'toggle', testId }),
      clearRequest: () => dispatch({ type: 'clear' }),
      isOpen,
      setOpen,
    };
  }, [isOpen, selectedIds]);

  return <RequisitionContext.Provider value={value}>{children}</RequisitionContext.Provider>;
}

export function useRequisition() {
  const value = useContext(RequisitionContext);
  if (!value) throw new Error('useRequisition must be used inside RequisitionProvider');
  return value;
}
