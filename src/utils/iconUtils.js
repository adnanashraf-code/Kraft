import * as LucideIcons from 'lucide-react';
import * as RemixIcons from '@remixicon/react';
import * as SimpleIcons from 'simple-icons';

// 1. One-time merge of all icon libraries
export const COMBINED_LIBRARY = { ...LucideIcons, ...RemixIcons };

// 2. Pre-calculated maps for O(1) matching
const ICON_KEYS = Object.keys(COMBINED_LIBRARY);
const LOWER_KEYS_MAP = ICON_KEYS.reduce((acc, key) => {
  acc[key.toLowerCase()] = key;
  return acc;
}, {});

const BRAND_DATA_MAP = Object.keys(SimpleIcons).reduce((acc, key) => {
  const icon = SimpleIcons[key];
  if (icon && typeof icon === 'object') {
     const title = (icon.title || '').toLowerCase();
     const slug = (icon.slug || '').toLowerCase();
     const entry = { type: 'brand', path: icon.path, hex: icon.hex, title: icon.title };
     if (slug) acc['si' + slug] = entry;
     if (title) acc[title] = entry;
     acc[key.toLowerCase()] = entry;
  }
  return acc;
}, {});

// 3. Raw data for CloudHub categories to prevent duplicate imports
export const BRAND_CATEGORIES = {
  tech: {
    label: 'Tech & AI',
    logos: [
      { name: 'Google', icon: SimpleIcons.siGoogle }, { name: 'Apple', icon: SimpleIcons.siApple },
      { name: 'Meta', icon: SimpleIcons.siMeta }, { name: 'NVIDIA', icon: SimpleIcons.siNvidia },
      { name: 'Intel', icon: SimpleIcons.siIntel }, { name: 'AMD', icon: SimpleIcons.siAmd },
      { name: 'Samsung', icon: SimpleIcons.siSamsung }, { name: 'Sony', icon: SimpleIcons.siSony },
      { name: 'Xiaomi', icon: SimpleIcons.siXiaomi }, { name: 'Huawei', icon: SimpleIcons.siHuawei },
      { name: 'Alibaba', icon: SimpleIcons.siAlibabacloud }, { name: 'Acer', icon: SimpleIcons.siAcer },
      { name: 'HP', icon: SimpleIcons.siHp }, { name: 'Dell', icon: SimpleIcons.siDell },
      { name: 'Asus', icon: SimpleIcons.siAsus }, { name: 'Lenovo', icon: SimpleIcons.siLenovo }
    ]
  },
  social: {
    label: 'Social & Comms',
    logos: [
      { name: 'Facebook', icon: SimpleIcons.siFacebook }, { name: 'Instagram', icon: SimpleIcons.siInstagram },
      { name: 'X / Twitter', icon: SimpleIcons.siX }, { name: 'YouTube', icon: SimpleIcons.siYoutube },
      { name: 'TikTok', icon: SimpleIcons.siTiktok }, { name: 'Snapchat', icon: SimpleIcons.siSnapchat },
      { name: 'Pinterest', icon: SimpleIcons.siPinterest }, { name: 'Reddit', icon: SimpleIcons.siReddit },
      { name: 'Discord', icon: SimpleIcons.siDiscord }, { name: 'WhatsApp', icon: SimpleIcons.siWhatsapp },
      { name: 'Telegram', icon: SimpleIcons.siTelegram }, { name: 'Messenger', icon: SimpleIcons.siMessenger },
      { name: 'Twitch', icon: SimpleIcons.siTwitch }, { name: 'Quora', icon: SimpleIcons.siQuora },
      { name: 'Medium', icon: SimpleIcons.siMedium }, { name: 'Tumblr', icon: SimpleIcons.siTumblr }
    ]
  },
  dev: {
    label: 'Dev & Cloud',
    logos: [
      { name: 'GitHub', icon: SimpleIcons.siGithub }, { name: 'GitLab', icon: SimpleIcons.siGitlab },
      { name: 'Bitbucket', icon: SimpleIcons.siBitbucket }, { name: 'Docker', icon: SimpleIcons.siDocker },
      { name: 'Kubernetes', icon: SimpleIcons.siKubernetes }, { name: 'Vercel', icon: SimpleIcons.siVercel },
      { name: 'Netlify', icon: SimpleIcons.siNetlify }, { name: 'Supabase', icon: SimpleIcons.siSupabase },
      { name: 'Firebase', icon: SimpleIcons.siFirebase }, { name: 'Railway', icon: SimpleIcons.siRailway },
      { name: 'Cloudflare', icon: SimpleIcons.siCloudflare }, { name: 'DigitalOcean', icon: SimpleIcons.siDigitalocean },
      { name: 'Hasura', icon: SimpleIcons.siHasura }, { name: 'Vite', icon: SimpleIcons.siVite },
      { name: 'Postman', icon: SimpleIcons.siPostman }, { name: 'Insomnia', icon: SimpleIcons.siInsomnia }
    ]
  },
  automotive: {
    label: 'Automotive',
    logos: [
      { name: 'Tesla', icon: SimpleIcons.siTesla }, { name: 'BMW', icon: SimpleIcons.siBmw },
      { name: 'Ford', icon: SimpleIcons.siFord }, { name: 'Toyota', icon: SimpleIcons.siToyota },
      { name: 'Chevrolet', icon: SimpleIcons.siChevrolet }, { name: 'Ferrari', icon: SimpleIcons.siFerrari },
      { name: 'Lamborghini', icon: SimpleIcons.siLamborghini }, { name: 'Porsche', icon: SimpleIcons.siPorsche },
      { name: 'Audi', icon: SimpleIcons.siAudi }, { name: 'Honda', icon: SimpleIcons.siHonda },
      { name: 'Volkswagen', icon: SimpleIcons.siVolkswagen }, { name: 'Nissan', icon: SimpleIcons.siNissan },
      { name: 'Mitsubishi', icon: SimpleIcons.siMitsubishi }, { name: 'Mazda', icon: SimpleIcons.siMazda },
      { name: 'Maserati', icon: SimpleIcons.siMaserati }, { name: 'Bentley', icon: SimpleIcons.siBentley }
    ]
  },
  entertainment: {
    label: 'Entertainment',
    logos: [
      { name: 'Netflix', icon: SimpleIcons.siNetflix }, { name: 'Spotify', icon: SimpleIcons.siSpotify },
      { name: 'HBO', icon: SimpleIcons.siHbo }, { name: 'SoundCloud', icon: SimpleIcons.siSoundcloud },
      { name: 'Tidal', icon: SimpleIcons.siTidal }, { name: 'Steam', icon: SimpleIcons.siSteam }, 
      { name: 'Epic Games', icon: SimpleIcons.siEpicgames }, { name: 'Roblox', icon: SimpleIcons.siRoblox }, 
      { name: 'Unity', icon: SimpleIcons.siUnity }, { name: 'Unreal Engine', icon: SimpleIcons.siUnrealengine }, 
      { name: 'Blender', icon: SimpleIcons.siBlender }, { name: 'PlayStation', icon: SimpleIcons.siPlaystation }, 
      { name: 'Ubisoft', icon: SimpleIcons.siUbisoft }, { name: 'Atari', icon: SimpleIcons.siAtari }, 
      { name: 'Sega', icon: SimpleIcons.siSega }
    ]
  }
};

// 4. Raw name lists for the Asset Vault
export const RAW_LUCIDE_NAMES = Object.keys(LucideIcons).filter(k => /^[A-Z]/.test(k) && !['createLucideIcon', 'Icon', 'LucideIcon'].includes(k));
export const RAW_REMIX_NAMES = Object.keys(RemixIcons).filter(k => /^[A-Z]/.test(k) && k !== 'RiContext');
export const RAW_BRAND_DATA = Object.keys(SimpleIcons).filter(k => k.startsWith('si')).map(k => ({
  name: SimpleIcons[k].title,
  path: SimpleIcons[k].path,
  hex: SimpleIcons[k].hex,
  type: 'logo'
}));

/**
 * Universal resolver (O(1))
 */
export const resolveIcon = (name) => {
  if (!name || typeof name !== 'string') return null;
  if (COMBINED_LIBRARY[name]) return COMBINED_LIBRARY[name];

  const clean = name.replace(/Icon$/i, '').replace(/[._-]/g, '').toLowerCase();
  
  if (LOWER_KEYS_MAP[clean]) return COMBINED_LIBRARY[LOWER_KEYS_MAP[clean]];
  if (BRAND_DATA_MAP[clean]) return BRAND_DATA_MAP[clean];
  if (LOWER_KEYS_MAP['ri' + clean]) return COMBINED_LIBRARY[LOWER_KEYS_MAP['ri' + clean]];
  
  return null;
};

// 5. Guaranteed Icons for common UI elements
export const UtilityIcons = {
  AlertCircle: LucideIcons.AlertCircle || LucideIcons.Info,
  Box: LucideIcons.Box || LucideIcons.Square,
  Search: LucideIcons.Search,
};

export const FEATURED_ICON_NAMES = [
  'Home', 'Search', 'Settings', 'User', 'Mail', 'Bell', 'Heart', 'Star', 
  'Check', 'X', 'Plus', 'Minus', 'Play', 'Pause', 'ChevronRight', 'ChevronLeft', 
  'ArrowUp', 'ArrowDown', 'Cloud', 'Zap', 'Shield', 'Globe', 'Briefcase', 
  'Camera', 'Layout', 'Layers', 'Grid', 'Type', 'Image', 'Box', 'Music', 
  'Video', 'MessageSquare', 'Phone', 'MapPin', 'Calendar', 'Trash2', 'Edit', 
  'ExternalLink', 'Download', 'Upload', 'Lock', 'Unlock', 'Eye', 'EyeOff', 
  'ThumbsUp', 'ThumbsDown', 'Award', 'BadgeHelp', 'Info'
];
