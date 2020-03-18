import { mdiCloudUpload, mdiPlaylistMusic } from '@mdi/js'

export const icon = {
  playlist: mdiPlaylistMusic,
  upload: mdiCloudUpload
}

export type IconName = keyof typeof icon
