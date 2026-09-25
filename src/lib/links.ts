export const GITHUB_URL = 'https://github.com/damlois/Scouvela';

const PLACEHOLDER_APIFY_URL = '#apify-actor';

export function getApifyActorUrl(): string | null {
  const value = process.env.NEXT_PUBLIC_APIFY_ACTOR_URL?.trim();
  if (!value || value.includes('your-username')) {
    return null;
  }
  return value;
}

export function getApifyHref(): string {
  return getApifyActorUrl() ?? PLACEHOLDER_APIFY_URL;
}

export function isApifyConfigured(): boolean {
  return getApifyActorUrl() !== null;
}
