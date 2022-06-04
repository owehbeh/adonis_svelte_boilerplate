/*
|--------------------------------------------------------------------------
| Inertia Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Inertia from '@ioc:EidelLev/Inertia'
import { getUserMenu } from 'App/Helpers/MenuHelper'
import Base64 from 'crypto-js/enc-base64'
import Utf8 from 'crypto-js/enc-utf8'

Inertia.share({
  data: (ctx) => {
    let data = {}
    // FLASHED MESSAGES
    // CHECKS IF THERE IS A SESSION MESSAGE goBackWithMessage SAVED FROM THE FEEDBACK HELPER FUNCTION
    // => IF SO IT RESTORES THE FLASHED MESSAGES FROM THE OLD REQUEST
    // => FLASHES THEM INTO INERTIA
    // => THEN DELTES THE goBackWithMessage
    const comingFromFeedbackHelper = ctx.session.get('goBackWithMessage')
    if (comingFromFeedbackHelper) ctx.session.reflash()
    ctx.session.forget('goBackWithMessage')
    const flashedMessagesToReturn = ctx.session.responseFlashMessages.all()
    data['flashedMessages'] = flashedMessagesToReturn

    // USER
    data['user'] = ctx.auth.user

    // SIDE MENU ITEMS
    data['sideMenuItems'] = getUserMenu(ctx.auth.user)

    // ENCRYPT AND RETURN
    const dataString = JSON.stringify(data)
    let data64 = Base64.stringify(Utf8.parse(dataString))
    return data64
  },
}).version(() => Inertia.manifestFile('public/assets/manifest.json'))
