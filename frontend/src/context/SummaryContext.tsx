import React, {
  createContext,
  useContext,
  useState,
  type ReactElement,
} from "react";

type Summary = {
  id: string;
  title: string;
  content: string;
};

type SummaryContextType = {
  summaries: Summary[];
  setSummaries: React.Dispatch<React.SetStateAction<Summary[]>>;
};

export const SummaryContext = createContext<SummaryContextType | null>(null);

export const SummaryProvider = ({ children }: { children: ReactElement }) => {
  const [summaries, setSummaries] = useState<Summary[]>([]);

  return (
    <SummaryContext.Provider value={{ summaries, setSummaries }}>
      {children}
    </SummaryContext.Provider>
  );
};

export const useSummaries = () => {
  const context = useContext(SummaryContext);
  if (!context) {
    throw new Error("useSummaries must be used within an SummaryProvider");
  }
  return context;
};
