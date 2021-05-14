export interface Config {
  token?: string
  botUserID?: string
  prefix?: {
    prod: string[]
    staging: string[]
    dev: string[]
  }
  developers: number
  invite: string
  radio?: Partial<Radio>
  guild?: Guild
}

export interface Radio {
  name: string
  site: string
  player: string
  streamLink: string[]
  infoApi: string
  description: string
  logo: string
}

export interface Guild {
  discordid: number
  link?: string
  prefix?: string[]
  AdminRoles?: {
    id: string
    roleName: string
    permission: 'internal' | 'admin'
  }

  Channels?: {
    textID?: string
    voiceID?: string
  }
}
