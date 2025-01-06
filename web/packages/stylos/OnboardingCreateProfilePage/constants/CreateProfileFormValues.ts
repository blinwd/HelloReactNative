import type { Ethnicity } from './ethnicity';
import type { Gender } from './gender';

export interface CreateProfileFormValues {
  feet: number | string;
  inches: number | string;
  weight: number | string;
  gender: Gender | string;
  ethnicity: Ethnicity | string;
}
