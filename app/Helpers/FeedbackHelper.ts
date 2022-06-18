import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { string } from '@ioc:Adonis/Core/Helpers'
import Ws from 'App/Services/Ws'
import Env from '@ioc:Adonis/Core/Env'
import { User } from '@prisma/client'
const AIRBYTE_URL = Env.get('AIRBYTE_URL')

export default class FeedbackHelper {
  /**
   * MUS USE TO HANDLE ERRORS IN CATCH STATEMENTS
   * @param ctx HttpContextContract
   * @param error Error Object
   * @param message Custom error message (optional)
   * @returns Redirects to desired page filling error message
   */
  public static handleError = async (
    ctx: HttpContextContract,
    error,
    message?: string,
    persistent: boolean = false,
    severity: NotificationType = 'error'
  ) => {
    // Check if error code is of type NotificationType
    // If so set severity to error code
    // Remove the error code from the message
    if (notificationTypesList.includes(error.code)) {
      severity = error.code
      error.message = error.message.replace(`${error.code}: `, '')
    }

    // Submit data to service error handler and wait for the result
    const result = await FeedbackHelper.handleServiceError(
      error,
      ctx.auth.user,
      message,
      persistent,
      undefined
    )

    // Return error modified by the handleServiceError fn
    // if (ctx.auth.isLoggedIn)
    return FeedbackHelper.goBackWithMessage(
      ctx,
      result.returnedErrorMessage,
      severity,
      result.redirectUrl
    )
    // else
    //   return FeedbackHelper.showMessageNoAuth(
    //     ctx,
    //     'Something went wrong.',
    //     result.returnedErrorMessage
    //   )
  }

  public static handleServiceError = async (
    error,
    user?: User,
    message?: string,
    persistent: boolean = false,
    customURL?: string
  ): Promise<{
    errorId: string
    debugErrorMessage: string
    returnedErrorMessage: string
    redirectUrl: string
  }> => {
    try {
      // Set values
      const errorId = string.generateRandom(10)
      const debugErrorMessage: string = _getMessageFromCode(error, message)
      const returnedErrorMessage: string = debugErrorMessage + ' - Support Code: ' + errorId
      const redirectUrl = customURL || ''

      const errorToSubmit = {
        user: user?.email,
        error_id: errorId,
        error_message: debugErrorMessage,
        error_raw: error,
      }
      console.error(errorToSubmit)

      // Send notification if persistent
      if (user && persistent) {
        // NotificationsHelper.sendPersistent(user.id, returnedErrorMessage, {
        //   template: 'error',
        //   state: 'error',
        //   url: redirectUrl,
        // })
        Ws.io.emit(`error_push_${user.id}`, {
          error_message: returnedErrorMessage,
          error_url: redirectUrl,
        })
      }

      return { errorId, debugErrorMessage, returnedErrorMessage, redirectUrl }
    } catch (error) {
      logUncaughtError(error)
      return {
        errorId: 'ERROR_SAVING_ERROR',
        debugErrorMessage: error,
        returnedErrorMessage: 'ERROR_SAVING_ERROR',
        redirectUrl: '/',
      }
    }
  }

  /**
   * To be used when user is not logged in and need to send feedback back to user
   * @param ctx HttpContextContract
   * @param title Title to show
   * @param message Message to show
   * @returns redirects to desired page filling title and message
   */
  public static showMessageNoAuth = (ctx: HttpContextContract, title: string, message: string) => {
    return ctx.inertia.render('auth/login', {
      title: title,
      message: message,
    })
  }

  /**
   * To be used when user is not logged in and need to send feedback back to user
   * along with suggested action
   * @param ctx HttpContextContract
   * @param title Title to show
   * @param message Message to show
   * @param buttonText Text of the button
   * @param buttonLink Where should the button redirect to
   * @returns redirects to desired page filling title and message
   */
  public static showMessageAndActionNoAuth = (
    ctx: HttpContextContract,
    title: string,
    message: string,
    buttonText: string,
    buttonLink: string
  ) => {
    return _showMessage(ctx, title, message, buttonText, buttonLink)
  }

  /**
   * Use this function to redircet back to page showing a success
   * or error message on the page
   * @param ctx
   * @param message Message to show
   * @param type success | error
   * @returns redirects to previous page filling error or success message
   */
  public static goBackWithMessage = (
    ctx: HttpContextContract,
    message: string,
    type: NotificationType,
    url?: string,
    persistent: boolean = false
  ) => {
    let messageToFlash: any = {}
    messageToFlash[type] = message
    messageToFlash[`${type}_url`] = url
    ctx.session.flash(messageToFlash)
    if (persistent) {
      // NotificationsHelper.sendPersistent(ctx.auth.user!.id, message, {
      //   state: type,
      //   url,
      //   template: type,
      // })
    }
    ctx.session.put('goBackWithMessage', true)
    return ctx.response.redirect().withQs().back()
  }

  /**
   * MUS USE TO HANDLE ERRORS IN CATCH STATEMENTS
   * @param ctx HttpContextContract
   * @param error Error Object
   * @param message Custom error message (optional)
   * @returns Redirects to the home page filling error message
   */

  public static handleErrorToRoute = (
    ctx: HttpContextContract,
    error,
    route: string,
    message?,
    severity: NotificationType = 'error'
  ) => {
    // Set values
    const errorId = string.generateRandom(10)
    const debugErrorMessage: string = _getMessageFromCode(error, message)
    const returnedErrorMessage: string = debugErrorMessage + ' - Error:' + errorId
    const user = ctx.auth.user

    // Log error
    console.error({
      user: ctx.auth.isLoggedIn ? user!.email : '',
      error_id: errorId,
      error_message: debugErrorMessage,
      error_raw: error,
    })

    // Check if error code is of type NotificationType
    // If so set severity to error code
    // Remove the error code from the message
    if (notificationTypesList.includes(error.code)) {
      severity = error.code
      error.message = error.message.replace(`${error.code}: `, '')
    }

    // Return error
    if (!ctx.auth.isLoggedIn && !route.startsWith('/auth'))
      return FeedbackHelper.showMessageNoAuth(ctx, 'Something went wrong.', returnedErrorMessage)
    else {
      let messageToFlash: any = {}
      messageToFlash['error'] = returnedErrorMessage
      ctx.session.flash(messageToFlash)
      ctx.session.put('goBackWithMessage', true)
      return ctx.response.redirect(route)
    }
  }

  /**
   * Use this function to redircet back to page showing a success
   * or error message on the page
   * @param ctx
   * @param message Message to show
   * @param type success | error
   * @returns redirects to home page filling error or success message
   */
  public static goToRouteWithMessage = (
    ctx: HttpContextContract,
    message: string,
    route: string,
    type: 'success' | 'error'
  ) => {
    let messageToFlash: any = {}
    messageToFlash[type] = message
    ctx.session.flash(messageToFlash)
    ctx.session.put('goBackWithMessage', true)
    return ctx.response.redirect(route)
  }

  public static refreshPage = (url: string, user: User) => {
    Ws.io.emit(`page_refresh_${user!.id}`, { url: url })
  }
}

/* -------------------------------------------------------------------------- */
/*                              PRIVATE FUNCTOINS                             */
/* -------------------------------------------------------------------------- */

function _showMessage(
  ctx: HttpContextContract,
  title: string,
  message: string,
  buttonText?: string,
  buttonLink?: string
) {
  return ctx.inertia.render('auth/message', {
    title: title,
    message: message,
    button_text: buttonText,
    button_link: buttonLink,
  })
}

function _getMessageFromCode(error: any, message: any) {
  if (message && message !== '') return message
  let errorMessage: string = ''
  // Check Authentication
  if (error.code === 'E_INVALID_AUTH_UID') errorMessage = 'Wrong email or password'

  // Check row not found
  if (error?.code === 'E_VALIDATION_FAILURE')
    errorMessage = 'Invalid submission, please check for empty or invalid fields'
  else if (error?.code === 'E_ROW_NOT_FOUND') errorMessage = 'Hmmm, could not find that'

  if (error?.code === 'E_INVALID_AUTH_PASSWORD') errorMessage = 'Wrong email or password'

  // Check for custom message
  const customError = error.status === 3333
  if (customError) errorMessage = error.message

  //Check for Oasis Error
  const oasisError = error.name === 'ApiError'
  const noPermissionError = error.response?.status === 403
  if (oasisError && noPermissionError)
    errorMessage = 'Please click the link to grant Castalise the required permissions'

  //Check for Airbyte Error
  const airbyteError = error.config?.url.includes(AIRBYTE_URL)
  //const inputValidataionFailed = error.response?.status == 404
  if (airbyteError) {
    if (error.response?.statusText) errorMessage = error.response.statusText
    if (error.data?.message) errorMessage = error.data?.message
    if (error.message) errorMessage = error.message
  }
  if (errorMessage === '') errorMessage = 'An error occured, please contact support'
  return errorMessage
}

export function logUncaughtError(error) {
  console.log(`--------------------------UNCAUGHT-ERROR-START--------------------------\n`)
  console.log(error)
  console.log(`--------------------------UNCAUGHT-ERROR-END----------------------------\n`)
}

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

const notificationTypesList = [
  'success',
  'error',
  'debug',
  'critical',
  'info',
  'warning',
  'fatal',
] as const
export type NotificationType = typeof notificationTypesList[number]
