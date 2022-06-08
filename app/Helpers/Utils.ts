const fs = require('fs')

export function ensureExists(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }
}
