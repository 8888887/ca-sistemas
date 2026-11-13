import { IconName } from '../ui/icon/icon.data';

export interface Solution {
  readonly slug: string;
  readonly label: string;
  readonly icon: IconName;
  readonly description: string;
}

export interface ServiceGroup {
  readonly id: string;
  readonly label: string;
  readonly icon: IconName;
  readonly items: readonly Solution[];
}

export type SolutionCategory = 'platform' | 'services';
