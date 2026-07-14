const DEFAULT_API_BASE =
  "https://munchr-decqdzgmgcd6h8cb.westus3-01.azurewebsites.net/";

const raw = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || DEFAULT_API_BASE;

export const API_BASE_URL = raw.endsWith("/") ? raw : `${raw}/`;
