/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const Base = lazyLoad(
  () => import('./index'),
  module => module.Base,
);
