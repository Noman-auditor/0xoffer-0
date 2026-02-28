/**
 * utils/logger.js  —  Minimal structured logger
 */
const LEVELS = { info: '✓', warn: '⚠', error: '✖', debug: '·' };

function log(level, ...args) {
  const ts = new Date().toISOString();
  const prefix = `[${ts}] ${LEVELS[level] || level.toUpperCase()}`;
  if (level === 'error') {
    console.error(prefix, ...args);
  } else {
    console.log(prefix, ...args);
  }
}

export const logger = {
  info:  (...a) => log('info',  ...a),
  warn:  (...a) => log('warn',  ...a),
  error: (...a) => log('error', ...a),
  debug: (...a) => {
    if (process.env.NODE_ENV !== 'production') log('debug', ...a);
  },
};
