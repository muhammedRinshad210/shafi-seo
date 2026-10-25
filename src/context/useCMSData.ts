import { useContext } from 'react';
import { CMSContext, type CMSContextType } from './CMSContextBase';

export const useCMSData = (): CMSContextType => {
  return useContext(CMSContext);
};
