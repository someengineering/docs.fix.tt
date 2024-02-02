import BrowserOnly from '@docusaurus/BrowserOnly';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import useIsBrowser from '@docusaurus/useIsBrowser';
import Admonition from '@theme/Admonition';
import { useEffect, useState } from 'react';

export default function PlausibleToggle(): JSX.Element {
  const [isExcluded, setIsExcluded] = useState<boolean>(false);
  const isProd =
    useIsBrowser() && new URL(window.location.href).hostname === 'docs.fix.tt';
  const { pathname } = useLocation();

  useEffect(
    () =>
      setIsExcluded(window.localStorage.getItem('plausible_ignore') === 'true'),
    [],
  );

  return (
    <BrowserOnly>
      {() =>
        isProd ? (
          <>
            <p>
              To toggle whether your visits to <code>docs.fix.tt</code> are
              counted, simply click the following button:
            </p>
            <p>
              <button
                onClick={() => {
                  if (isExcluded) {
                    window.localStorage.removeItem('plausible_ignore');
                  } else {
                    window.localStorage.setItem('plausible_ignore', 'true');
                  }

                  setIsExcluded(!isExcluded);
                }}
                className={`button button--primary${
                  isExcluded ? ' button--outline' : ''
                }`}
              >
                {isExcluded ? 'Stop Excluding My Visits' : 'Exclude My Visits'}
              </button>
            </p>
            <Admonition type="info">
              <p>
                <strong>
                  You are {isExcluded ? '' : 'not '}curently excluding your
                  visits.
                </strong>
              </p>
            </Admonition>
          </>
        ) : (
          <Admonition type="note">
            <p>
              You are not currently browsing{' '}
              <Link href="https://docs.fix.tt">
                <code>docs.fix.tt</code>
              </Link>
              .{' '}
              <strong>
                <Link href={`http://docs.fix.tt${pathname}`}>
                  Click here to view this page on <code>docs.fix.tt</code>.
                </Link>
              </strong>
            </p>
          </Admonition>
        )
      }
    </BrowserOnly>
  );
}
