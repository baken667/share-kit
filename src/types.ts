type PlatformsType = "whatsapp" | "telegram" | "email" | "native";

type ShareOptions = {
  url?: string;
  title?: string;
  desc?: string;
  platform?: PlatformsType;
  utmParams?: UtmParams;
};

type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  [key: string]: string | undefined;
};

export type { ShareOptions, UtmParams, PlatformsType };
