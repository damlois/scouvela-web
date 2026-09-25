export const GITHUB_URL = 'https://github.com/damlois/Scouvela';

export const APIFY_ACTOR_URL = 'https://apify.com/loisadex/scouvela-african-sme-opportunities';

export function getApifyHref(): string {
  return APIFY_ACTOR_URL;
}

export function isApifyConfigured(): boolean {
  return true;
}
