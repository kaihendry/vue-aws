const fs = require('fs')
const chance = require('chance').Chance()

const randomstatus = function () {
  const statuses = ['new', 'in-progress', 'processing', 'done']
  return statuses[Math.floor(Math.random() * statuses.length)]
}

const list = Array.from({length: 10}, function () {
  return { 'PutRequest': {
    'Item': {
      'uuid': { S: chance.guid() },
      'title': { S: chance.name() },
      'status': { S: randomstatus() },
      'updated_at': { S: `${new Date().getTime()}` }
    }
  }
  }
})

const j = { 'Movies': list }

fs.writeFile('./test-items.json', JSON.stringify(j, null, 2), 'utf-8')
