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
