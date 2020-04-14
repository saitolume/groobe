import {
  mdiAccount,
  mdiBell,
  mdiCloudUpload,
  mdiCog,
  mdiLink,
  mdiLogoutVariant,
  mdiMagnify,
  mdiPlaylistMusic,
  mdiVolumeOff
} from '@mdi/js'

export const icon = {
  bell: mdiBell,
  cog: mdiCog,
  link: mdiLink,
  mute: mdiVolumeOff,
  playlist: mdiPlaylistMusic,
  search: mdiMagnify,
  signOut: mdiLogoutVariant,
  user: mdiAccount,
  upload: mdiCloudUpload
}

export type IconName = keyof typeof icon
