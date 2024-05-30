import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import posthog from 'posthog-js';
import { PostHogProvider as Provider } from 'posthog-js/react';
import { useEffect } from 'react';

export default function PosthogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    siteConfig: {
      customFields: { isDev, isNetlify, isProd, posthogProjectApiKey },
    },
  } = useDocusaurusContext();

  useEffect(() => {
    if (posthogProjectApiKey && !posthog.__loaded) {
      posthog.init(posthogProjectApiKey as string, {
        api_host: isNetlify ? '/api/ingest' : 'https://eu.posthog.com',
        ui_host: 'https://eu.posthog.com',
        debug: !!isDev,

        persistence: 'cookie',
        cross_subdomain_cookie: !!isProd,
        secure_cookie: !!isNetlify,

        opt_out_capturing_by_default: true,
        opt_out_capturing_persistence_type: 'cookie',
        opt_out_persistence_by_default: true,

        capture_pageview: false, // Page views are captured manually
        capture_pageleave: true,

        disable_session_recording: true,
        disable_surveys: true,
        enable_recording_console_log: false,
      });
    }
  }, [isDev, isNetlify, isProd, posthogProjectApiKey]);

  return <Provider client={posthog}>{children}</Provider>;
}
