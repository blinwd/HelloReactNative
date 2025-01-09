export const uuidFromUrn = (urn: string): string =>
  urn.split(':').slice(-1)[0];
