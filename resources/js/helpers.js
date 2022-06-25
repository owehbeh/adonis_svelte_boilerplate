/* eslint-disable no-self-assign */
import { writable } from 'svelte/store'
import Base64 from 'crypto-js/enc-base64'
import Utf8 from 'crypto-js/enc-utf8'
export const modal = {
  show: writable(false),
  title: writable(),
  content: writable(),
  button: writable(),
  fn: writable(),
}

export const form = {
  url: writable(),
  params: writable(),
}

export const decodeProps = (props) => {
  let buff = Base64.parse(props)
  const decoded = Utf8.stringify(buff)
  const decodedJSON = JSON.parse(decoded)
  return decodedJSON
}

export const parseDbDate = (dateString) => {
  const finalString =
    new Date(dateString).toLocaleDateString() + ' - ' + new Date(dateString).toLocaleTimeString()
  return finalString
}

export const confirmModal = (title, content, buttonText, fn) => {
  modal.show.set(true)
  modal.title.set(title)
  modal.content.set(content)
  modal.button.set(buttonText)
  modal.fn.set(fn)
}

/**
 * Submit an HTML form programmatically
 * @param {String} url The URL of the Post Request to be made
 * @param {Object} params Key/Value Object to be submitted
 * @param {String} csrf If passed will add a hidden _csrf input
 */
export const PostThis = (url, params, csrf) => {
  var myForm = document.createElement('FORM')
  myForm.name = 'post_this_form'
  myForm.method = 'POST'
  myForm.action = url
  var myTb
  if (csrf) {
    myTb = document.createElement('INPUT')
    myTb.type = 'HIDDEN'
    myTb.name = '_csrf'
    myTb.value = csrf
    myForm.appendChild(myTb)
  }
  if (params)
    for (const [key, value] of Object.entries(params)) {
      myTb = document.createElement('INPUT')
      myTb.type = 'HIDDEN'
      myTb.name = key
      myTb.value = value
      myForm.appendChild(myTb)
    }
  document.body.appendChild(myForm)
  myForm.submit()
}

/**
 * Convert full name to acronym
 * @param {String} s full name of user
 * @returns Acronym of user's name Omar Wehbeh = OW
 */
export const acronym = function (s) {
  var words
  var acronym
  var nextWord

  words = s.split(' ')
  acronym = ''
  let index = 0
  while (index < words.length) {
    nextWord = words[index]
    acronym = acronym + nextWord.charAt(0)
    index = index + 1
  }
  return acronym
}

/**
 * Get the same random hex code for the same text
 * @param {String} text Any text
 * @returns hex string
 */
export const textToHex = (text) => {
  var hash = 0
  if (text.length === 0) return hash
  for (var i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash)
    hash = hash & hash
  }
  var color = '#'
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 255
    color += ('00' + value.toString(16)).substr(-2)
  }
  return color
}
