export interface Report {
  headline: string;
  sourceName: string;
  summary: string;
  framing: string;
  claims: string[];
  blindSpots: string;
  globalContext: string;
  criticalQuestions: string[];
}

export interface HistoryItem {
  id: string;
  url: string;
  timestamp: string;
  report: Report;
}
