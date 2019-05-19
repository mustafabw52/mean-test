import winston from 'winston'
import fs from 'fs'

const logDir = 'logs'

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

winston.emitErrs = true

let logLevel = 'debug';
const timestampFormat = () => {
  const date = new Date()
  return `${date.toDateString()} -lo ${date.toLocaleTimeString()}`
}

const transports = [
  new winston.transports.Console({
    level: logLevel,
    handleExceptions: true,
    json: false,
    colorize: true,
    timestamp: timestampFormat
  }),
  new winston.transports.File({
    level: logLevel,
    filename: 'logs/'+new Date().toISOString().split('T')[0]+'.log' 
  })
]

const logger = new winston.Logger({ transports: transports, exitOnError: false })

export default class Logger {
  static info (logTitle, argHash) {
    this.log('info', logTitle, argHash)
  }

  static debug (logTitle, argHash) {
    this.log('debug', logTitle, argHash)
  }

  static error (logTitle, argHash) {
    this.log('error', logTitle, argHash)
  }

  static log (logType, logTitle, argHash) {
    const allArgs = Object.assign({ logTitle }, argHash)
    const logMessage = this.buildMessage(allArgs)
    this.writeToLog(logType, logTitle, logMessage, argHash)
  }

  static buildMessage (logAttrs) {
    let msg = [`${logAttrs.logTitle} => `]
    if (logAttrs.klass) { msg.push('Class:', logAttrs.klass.name, ',') }
    if (logAttrs.message) { msg.push('Message:', logAttrs.message, ',') }
    if (logAttrs.context) { msg.push('Context:', logAttrs.context, ',') }
    if (logAttrs.metadata) { msg.push('Metadata:', logAttrs.metadata, ',') }
    if (logAttrs.tagCtx) { msg.push('TagsCtx:', logAttrs.tagCtx, ',') }
    if (logAttrs.userCtx) { msg.push('UserCtx:', logAttrs.userCtx, ',') }
    if (logAttrs.exception) { msg.push('ExceptionBacktrace:', logAttrs.exception.stack, ',') }
    if (logAttrs.fault) { msg.push('Fault:', logAttrs.fault, ',') }
    return msg
  }

  static writeToLog (logType, logTitle, logMessage, argHash) {
    if (argHash && ['start', 'around'].indexOf(argHash.wrap) !== -1) {
      logger[logType](this.generateWrapStr(logTitle, 'START'))
    } else if (argHash && ['end', 'around'].indexOf(argHash.wrap) !== -1) {
      logger[logType](this.generateWrapStr(logTitle, 'END'))
    } else {
      logger[logType](...logMessage)
    }
  }
}
