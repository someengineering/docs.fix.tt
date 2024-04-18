import BrowserOnly from '@docusaurus/BrowserOnly';
import CookieConsent from '@site/src/components/CookieConsent';
import PosthogPageView from '@site/src/components/PosthogPageView';
import PosthogProvider from '@site/src/providers/posthog';
import { type ReactNode } from 'react';

export default function Root({ children }: { children: ReactNode }) {
  return (
    <PosthogProvider>
      {children}
      <BrowserOnly>
        {() => (
          <>
            <CookieConsent />
            <PosthogPageView />
          </>
        )}
      </BrowserOnly>
    </PosthogProvider>
  );
}
