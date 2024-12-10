# @baken667/share-kit

`@baken667/share-kit` - is a universal sharing package for various platforms such as WhatsApp, Telegram, and native Web Share API. It supports appending UTM parameters to URLs and link formatting.

## Installation

Install via npm:

```bash
npm install @baken667/share-kit
```

Or use via CDN:

```bash
<script src="https://unpkg.com/@baken667/share-kit@1.0.2/dist/index.min.js"></script>
```

## Usage

### In a typescript/javascript project:

```javascript
import { share } from '@baken667/share-kit';

share({
  url: 'https://example.com',
  title: 'Check this out!',
  desc: 'Amazing content you will love',
  platform: 'whatsapp', // 'telegram', 'native'
  utmParams: {
    utm_source: 'newsletter',
    utm_medium: 'email',
    utm_campaign: 'launch'
  },
});
```

### Using via CDN:

```javascript
<script>
ShareKit.share({
  url: 'https://example.com',
  title: 'Check this out!',
  desc: 'Amazing content you will love',
  platform: 'telegram', // 'whatsapp', 'native'
})
</script>
```

## Parameters

- `url` (optional): The URL to share. Defaults to the current page URL.
- `title` (optional): The title of the message.
- `desc` (optional): The description of the message.
- `platform`: The platform for sharing (`whatsapp`, `telegram`, `native`).
- `utmParams` (optional): An object with UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, etc.).

## Supported Platforms

- Whatsapp
- Telegram
- Native Web Share API (if supported by the browser)

## License
This project is licensed under the MIT License. See the [MIT License](./LICENSE) file for more details.

## Author

- Github: [baken667](https://github.com/baken667)