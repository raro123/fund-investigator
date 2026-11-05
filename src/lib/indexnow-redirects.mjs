/**
 * Astro integration: after a production build, tell IndexNow about every old
 * URL in `_redirects` (backlog T-11).
 *
 * The seo-graph IndexNow step sends only the URLs the build makes, so search
 * engines are never told that a redirected URL changed. Bing and the other
 * IndexNow engines then keep the old page in their index until they recrawl it
 * by chance. This step sends the redirect sources (the old URLs) at each
 * deploy, so the engines fetch them, see the 301 and drop them.
 *
 * It runs only when `enabled` is true (the production build on `main`). A
 * network failure logs a warning and never fails the build.
 */
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const ENDPOINT = 'https://api.indexnow.org/indexnow';

/** Old paths from a Cloudflare Pages `_redirects` file: the first field of each rule. */
export const redirectSources = (text) =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => line.split(/\s+/)[0])
    // Only plain paths: a splat or placeholder is not a URL an engine can fetch.
    .filter((path) => path.startsWith('/') && !path.includes('*') && !path.includes(':'));

export default function indexNowRedirects({ enabled, key, host, siteUrl }) {
  return {
    name: 'indexnow-redirects',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        if (!enabled) return;
        let text;
        try {
          text = await readFile(new URL('_redirects', dir), 'utf8');
        } catch {
          logger.info(`No _redirects in ${fileURLToPath(dir)}; nothing to send.`);
          return;
        }
        const urlList = [...new Set(redirectSources(text))].map((path) => `${siteUrl}${path}`);
        if (urlList.length === 0) return;
        try {
          const response = await fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({
              host,
              key,
              keyLocation: `${siteUrl}/${key}.txt`,
              urlList,
            }),
            signal: AbortSignal.timeout(15000),
          });
          logger.info(`IndexNow: sent ${urlList.length} redirected URLs, HTTP ${response.status}.`);
        } catch (error) {
          logger.warn(`IndexNow: redirected URLs not sent (${error.message}).`);
        }
      },
    },
  };
}
