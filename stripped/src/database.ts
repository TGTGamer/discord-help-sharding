import { PrismaClient } from '@prisma/client'
import { Root } from '.'

export type DatabaseConstructData = {
  root?: Root
}

export class Database {
  root: Root
  public prisma: PrismaClient
  constructor(construct: DatabaseConstructData) {
    if (!construct.root)
      throw new Error(
        'option.root is undefined. Cannot construct database. Please contact package developers.'
      )
    this.root = construct.root
    this.root.log(100, `Prisma connection established`)
    this.prisma = new PrismaClient()
    this.prisma.$connect()
    this.main()
  }
  async destroy() {
    return await this.prisma.$disconnect()
  }
  async main() {
    if ((await this.prisma.guild.count()) < 1) {
      this.root.log(
        400,
        'The user database is empty. Populating row 0 with default user'
      )
      if (!this.root.config.guild || !this.root.config.guild?.discordid) this.root.log(800, "Incomplete guild in config")
      await this.prisma.guild.create({
        data: {
          id:
            this.root.config.guild!.discordid.toString(),
          invite: this.root.config.guild?.link,
          prefix: this.root.config.guild?.prefix,
          public: true,
          roles: {
            create: this.root.config.guild?.AdminRoles
          },
          channels: {
            create: {
              voiceID: this.root.config.guild?.Channels?.voiceID,
              AutoJoin: true,
              Connected: true
            }
          },
          user: {
            connectOrCreate: {
              where: {
                id: this.root.config.developers.toString()
              },
              create: {
                id: this.root.config.developers.toString(),
                permission: 'internal'
              }
            }
          }
        }
      })
    } else {
      this.root.log(300, 'Using existing database')
    }
  }
}
