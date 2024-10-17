import type { ShareOptions, UtmParams } from './types';
import { PlatformFormats } from './enum';

/*
  Appends UTM params to the URL
*/
export const appendUtmParams = (url: string, utmParams?: UtmParams): string => {
  if (!utmParams) return url;

  const urlObject = new URL(url);

  Object.keys(utmParams).forEach((key) => {
    if (utmParams[key]) {
      urlObject.searchParams.append(key, utmParams[key]!);
    }
  });

  return urlObject.toString();
};

/*
  Replaces {0} and {1} in the url templates 
*/
export const formatLink = (template: string, ...args: string[]): string => {
  return template.replace(/{(\d+)}/g, (_, number) => args[number] || '');
};

/*
  Formats the link and opens it in a new window or shares it natively
*/
export const share = ({
  url = window.location.href,
  title,
  desc,
  platform,
  utmParams,
}: ShareOptions): void => {
  const finalUrl = appendUtmParams(url, utmParams);
  const encodedUrl = encodeURIComponent(finalUrl);
  const encodedText = encodeURIComponent(
    title && desc ? `${title} - ${desc}` : title || desc || '',
  );

  let link = '';

  switch (platform) {
    case 'whatsapp':
      link = formatLink(
        PlatformFormats.WA_LINK_FORMAT,
        encodedText,
        encodedUrl,
      );
      break;
    case 'telegram':
      link = formatLink(
        PlatformFormats.TG_LINK_FORMAT,
        encodedUrl,
        encodedText,
      );
      break;
    case 'native':
      if (!navigator.canShare) {
        console.error(PlatformFormats.NOT_SUPPORTED_MESSAGE);
        return;
      }

      if (navigator.canShare({ url: finalUrl })) {
        navigator
          .share({
            title: title,
            text: `${title ? title : ''}${encodedUrl}${
              desc ? ` - ${desc}` : ''
            }`,
            url: finalUrl,
          })
          .catch((err) => console.error('Sharing failed', err));
        return;
      } else {
        console.error(PlatformFormats.NOT_SUPPORTED_MESSAGE);
        return;
      }
    default:
      console.warn(PlatformFormats.NOT_SUPPORTED_MESSAGE);
      break;
  }

  window.open(link, '_blank');
};
