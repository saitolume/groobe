import { mdiCloudUpload, mdiCog, mdiLogoutVariant, mdiMagnify, mdiPlaylistMusic } from '@mdi/js'

export const icon = {
  cog: mdiCog,
  playlist: mdiPlaylistMusic,
  search: mdiMagnify,
  signOut: mdiLogoutVariant,
  upload: mdiCloudUpload
}

export type IconName = keyof typeof icon
