/** @format */

import Analytics from 'appcenter-analytics';

export const trackEvent = (evt: string, params?: any) => {
  Analytics.trackEvent(evt, params);
};
