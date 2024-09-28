export interface LogMessage {
  message: string;
  service?: string;
  journey?: string;
  verbose?: boolean;
  data?: unknown;
}
