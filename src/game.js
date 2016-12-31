import defaultWords from './words'
import defaultLayouts from './layouts'

const players = ['r', 'b']

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// from http://stackoverflow.com/questions/18806210/generating-non-repeating-random-numbers-in-js
function shuffle(array) {
  let i = array.length
  let j = 0
  let temp

  while (i--) {
    j = Math.floor(Math.random() * (i + 1))

    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }

  return array
}

function findUniqueRandomWords(words, count) {
  return shuffle(words.slice(0)).slice(0, count)
}

exports.create = function (layouts = defaultLayouts, words = defaultWords) {
  const layout = layouts[randInt(0, layouts.length - 1)]
  const randomWords = findUniqueRandomWords(words, layout.tiles.length)
  return {
    ...layout,
    tiles: layout.tiles.map((color, i) => ({
      color,
      word: randomWords[i]
    }))
  }
}
