export interface PassportInterface {
  provider: 'discord' | 'google' | 'vk' | 'twitch';
  providerID: string;
  accessToken: string;
  email: string;
  username: string;
  discriminator: string | null;
  bannerColor: string | null;
  avatar: string | null;
}
