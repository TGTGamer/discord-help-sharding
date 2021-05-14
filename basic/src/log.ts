import { Logger, LoggingLevels } from '@videndum/utilities'
const locations: { [namespace: string]: string } = {}

export const L = new Logger({
  i18: {
    localesLocation: locations,
    defaultNamespace: 'default'
  },
  logger: {
    sentry: {
      enabled: process.env.NPM_PACKAGE_SENTRY ? true : false,
      config: {
        dsn: process.env.NPM_PACKAGE_SENTRY!
      }
    },
    file: {
      enabled: false,
      config: {
        logDirectory: 'logs',
        fileNamePattern: 'botlog.log'
      }
    },
    logLevel:
      process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'dev'
        ? LoggingLevels.unknown
        : process.env.NODE_ENV == 'staging' || process.env.NODE_ENV == 'stag'
        ? LoggingLevels.debug
        : LoggingLevels.info
  }
})
