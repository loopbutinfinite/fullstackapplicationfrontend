const DEFAULT_API_BASE =
  "https://csa-2526-munchr-a8dbh8ckfddrewh7.westus3-01.azurewebsites.net/";

const raw = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || DEFAULT_API_BASE;

export const API_BASE_URL = raw.endsWith("/") ? raw : `${raw}/`;
