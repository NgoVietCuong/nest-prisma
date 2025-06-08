import type { TransformableInfo } from 'logform';

export interface LogInfo extends TransformableInfo {
  context?: string;
  message: string;
  timestamp?: string;
}
