
const cleanupObject = raw => {
  const cleaned = {}

  if (raw.hasOwnProperty('m')) {
    return cleanupObject(raw['m'])
  }

  for (const prop in raw) {
    if (raw[prop].hasOwnProperty('n')) {
      cleaned[prop] = parseInt(raw[prop]['n'], 10)
    } else if (raw[prop].hasOwnProperty('s')) {
      cleaned[prop] = raw[prop]['s']
    } else if (raw[prop].hasOwnProperty('l')) {
      cleaned[prop] = raw[prop]['l'].map(item => {
        if (typeof(item) === 'object') {
          return cleanupObject(item)
        }
        return item
      })
    } else if (raw[prop].hasOwnProperty('m')) {
      cleaned[prop] = cleanupObject(raw[prop]['m'])
    } else {
      cleaned[prop] = raw[prop]
      console.log(`Unhandled property: ${prop}`)
    }
  }
  return cleaned
}

module.exports = {
  cleanupObject
}
