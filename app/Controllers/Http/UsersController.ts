import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { Exception } from '@adonisjs/core/build/standalone'

import Hash from '@ioc:Adonis/Core/Hash'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { NotificationTypeEnum } from 'Contracts/enums'
import FeedbackHelper from 'App/Helpers/FeedbackHelper'

export default class UsersController {
  /* ------------------------------ REGISTER VIEW ----------------------------- */
  // async registerView(ctx: HttpContextContract) {
  //   try {
  //     return ctx.view.render('auth/register', {
  //       email: ctx.params.email ? ctx.params.email : '',
  //     })
  //   } catch (error) {
  //     return FeedbackHelper.handleError(ctx, error)
  //   }
  // }

  // /* -------------------------------- REGISTER API -------------------------------- */
  // async register(ctx: HttpContextContract) {
  //   // Validate request
  //   await ctx.request.validate({
  //     schema: schema.create({
  //       name: schema.string({}, [rules.minLength(3)]),
  //       username: schema.string({}, [
  //         rules.minLength(3),
  //         rules.unique({ table: 'users', column: 'username' }),
  //       ]),
  //       email: schema.string({}, [
  //         rules.email({
  //           allowIpDomain: false,
  //         }),
  //         rules.unique({ table: 'users', column: 'email' }),
  //       ]),
  //       password: schema.string({}, [rules.confirmed()]),
  //       agree_checkbox: schema.string({}),
  //     }),
  //     messages: validationMessages,
  //     reporter: validator.reporters.vanilla,
  //   })

  //   try {
  //     // Get and set values
  //     const name = ctx.request.input('name')
  //     const username = ctx.request.input('username')
  //     const email = ctx.request.input('email')
  //     const password = ctx.request.input('password')
  //     // Create and save new user
  //     let user = await User.create({
  //       name: name,
  //       username: username,
  //       email: email,
  //       password: password,
  //     })
  //     // Create and save related settings
  //     let settings = new Setting()
  //     settings.darkMode = 1
  //     await user.related('settings').create({ darkMode: 0 })
  //     // Create and save new email token
  //     const ePToken = await createEpToken(email)
  //     // Send welcome email, don't await
  //     MailHelper.welcomeEmail(email, name)
  //     // Send email activation email, don't await
  //     MailHelper.validateEmail(email, name, ePToken.token)
  //     //Success
  //     return FeedbackHelper.showMessageNoAuth(
  //       ctx,
  //       'Thank you for registering',
  //       'Please check your email to activate your account'
  //     )
  //   } catch (error) {
  //     return FeedbackHelper.handleError(ctx, error)
  //   }
  // }

  /* ------------------------------- LOGIN VIEW ------------------------------- */
  public async loginView(ctx: HttpContextContract) {
    return ctx.inertia.render('auth/login')
  }
  /* ---------------------------------- LOGIN --------------------------------- */
  public async login(ctx: HttpContextContract) {
    try {
      const { email, password } = ctx.request.all()
      // const userToLogin = await User.query().where('email', email).first()
      const userToLogin = await prisma.user.findFirst({
        where: {
          email: email,
        },
      })
      const validPassword = userToLogin ? await Hash.verify(userToLogin.password, password) : false
      if (!validPassword)
        throw new Exception(
          `Email ${email} or password are wrong`,
          3333,
          NotificationTypeEnum.warning
        )

      await ctx.auth.use('web').login(userToLogin!)
      const user = ctx.auth.user!
      // If user email is not validated
      if (user.validated === false) {
        await ctx.auth.logout()

        // Check if user does not have more than 3 active tokens
        // const ePTokenCount = await EpToken.query().where({
        //   email: email,
        //   expired: 0,
        // })

        // If not generate a new tokens
        // if (ePTokenCount.length < 3) {
        //   const ePToken = new EpToken()
        //   ePToken.email = email
        //   ePToken.type = 'email'
        //   await ePToken.save()

        //   // Send email activation email, don't await
        //   MailHelper.validateEmail(email, user.name, ePToken.token)
        // }

        // Finished with error
        ctx.inertia.render('/')
        // return ctx.view.render('auth/message_validate', {
        //   title: 'Email is not activated',
        //   message:
        //     'Please activate your email by following the directions you received in your email',
        //   button_text: 'Login',
        //   button_link: '/auth/login',
        //   user: user,
        // })
      }

      // if (!user.workspace) await AirbyteHelper.signUp(user)
      // Success
      return ctx.response.redirect('/')
    } catch (error) {
      ctx.session.flash(error)
      ctx.session.flash({ loginError: 'These credentials do not work.' })
      return FeedbackHelper.handleErrorToRoute(ctx, error, '/login')
    }
  }

  /* ------------------------- RESEND VALIDATION EMAIL ------------------------ */
  public async sendValidationEmail(ctx: HttpContextContract) {
    try {
      const token = ctx.params.token.split('-')
      // const userId = token[0]
      const email = token[1]
      const user = await prisma.user.findFirst({ where: { email: email }, rejectOnNotFound: true })

      // check if user already validated
      if (user.validated === true) {
        throw new Exception('Account already validated', 3333, NotificationTypeEnum.info)
      }

      // create Ep token
      // const ePToken = new EpToken()
      // ePToken.email = email
      // ePToken.type = 'email'
      // await ePToken.save()

      // send validation email
      // MailHelper.validateEmail(email, user.name, ePToken.token)

      return ctx.view.render('auth/message', {
        title: 'Activation Email Resend',
        message:
          'Please activate your email by following the directions you received in your email',
        button_text: 'Login',
        button_link: '/auth/login',
        user: user,
      })
    } catch (error) {
      return FeedbackHelper.handleError(ctx, error)
    }
  }

  /* --------------------------------- LOGOUT --------------------------------- */
  public async logout(ctx) {
    try {
      await ctx.auth.logout()
      return ctx.response.redirect('/login')
    } catch (error) {
      console.log(error)
    }
  }

  /* ----------------------------- VALIDATE EMAIL ----------------------------- */
  // async validateEmail({ params, view }) {
  //   try {
  //     // Search for related email token
  //     const ePToken = await EpToken.query()
  //       .where({
  //         token: params.token,
  //         type: 'email',
  //       })
  //       .first()
  //     // If email token exists and is not expired
  //     if (
  //       ePToken &&
  //       ePToken?.expired === 0 &&
  //       minutesDifference(ePToken.createdAt, new Date()) < 4320
  //     ) {
  //       // Activate related user
  //       const affectedRows = await Database.from('users')
  //         .where('email', ePToken.email)
  //         .update('validated', 1)
  //       // Update related email token
  //       if (affectedRows.length > 0) {
  //         await Database.from('ep_tokens')
  //           .where({ email: ePToken.email, type: 'email' })
  //           .update('expired', 1)
  //       }

  //       // Send welcome email, don't await
  //       const relatedUser = await User.findByOrFail('email', ePToken.email)
  //       MailHelper.betaWelcomeEmail(relatedUser.email, relatedUser.name)

  //       return view.render('auth/message', {
  //         title: 'Thank you for validating your email',
  //         message: 'You may now login to your account',
  //         button_text: 'Login',
  //         button_link: '/auth/login',
  //       })
  //     }

  //     // Email token does not exist or is not valid ~ email is not activated
  //     return view.render('auth/message', {
  //       title: 'Activation link is expired',
  //       message: 'Please create a new one through login',
  //       button_text: 'Go To Login',
  //       button_link: '/auth/login',
  //     })
  //   } catch (error) {
  //     return view.render('auth/message', {
  //       title: 'Something went wrong',
  //       message: 'Please contact our support team',
  //     })
  //   }
  // }

  /* ------------------------ SEND RESET PASSWORD EMAIL ----------------------- */
  // async sendResetPasswordEmail({ request, view }) {
  //   // Validate request
  //   await request.validate({
  //     schema: schema.create({ email: schema.string({}, [rules.email()]) }),
  //     messages: validationMessages,
  //     reporter: validator.reporters.vanilla,
  //   })
  //   try {
  //     const email = request.requestBody.email
  //     let user = await User.query().where({ email: email }).first()
  //     if (!user) throw new Exception(`No user with email: ${email}`, 3333, Severity.Warning)

  //     const ePToken = new EpToken()
  //     ePToken.email = user.email
  //     ePToken.type = 'password'
  //     await ePToken.save()

  //     MailHelper.resetPasswordEmail(user.email, user.name, ePToken.token)

  //     // Success
  //     return view.render('auth/message', {
  //       title: 'Email Sent',
  //       message: 'Please follow the instructions in your email to continue',
  //       button_text: 'Go To Login',
  //       button_link: '/auth/login',
  //     })
  //   } catch (error) {
  //     console.log(error)
  //     return view.render('auth/message', {
  //       title: 'Something went wrong',
  //       message: 'Please contact our support team',
  //     })
  //   }
  // }

  /* ------------------------- EXECUTE RESET PASSWORD ------------------------- */
  // async resetPasswordExecute(ctx: HttpContextContract) {
  //   // Validate request
  //   await ctx.request.validate({
  //     schema: schema.create({
  //       password: schema.string({}, [rules.confirmed()]),
  //     }),
  //     messages: validationMessages,
  //     reporter: validator.reporters.vanilla,
  //   })
  //   try {
  //     const token = ctx.params.token
  //     // Search for related password token
  //     const ePToken = await EpToken.query()
  //       .where({
  //         token: token,
  //         type: 'password',
  //       })
  //       .first()

  //     // If password token exists and is not expired
  //     if (
  //       ePToken &&
  //       ePToken.expired === 0 &&
  //       minutesDifference(ePToken.createdAt, new Date()) < 60
  //     ) {
  //       const password = ctx.request.all().password
  //       let user = await User.query().where({ email: ePToken.email }).firstOrFail()
  //       user.password = password
  //       console.log(user)
  //       await user.save()
  //       // Update related password token
  //       await Database.from('ep_tokens')
  //         .where({ email: ePToken.email, type: 'password' })
  //         .update('expired', 1)

  //       MailHelper.resetPasswordSuccessEmail(user.email, user.name)
  //       // Success
  //       return ctx.view.render('auth/message', {
  //         title: 'Password successfully changed',
  //         message: 'Login with your new password',
  //         button_text: 'Go To Login',
  //         button_link: '/auth/login',
  //       })
  //     }

  //     // Password token does not exist or is not valid
  //     return ctx.view.render('auth/message', {
  //       title: 'Activation link is expired',
  //       // message: "Please create a new one.",
  //       message: ePToken?.expired,
  //       button_text: 'Reset Password',
  //       button_link: '/auth/reset-password',
  //     })
  //   } catch (error) {
  //     console.log(error)
  //     return ctx.view.render('auth/message', {
  //       title: 'Something went wrong',
  //       message: 'Please contact our support team',
  //     })
  //   }
  // }

  /* ----------------------- CHANGE PASSWORD (LOGGED IN) ---------------------- */
  // async resetPasswordByOld(ctx: HttpContextContract) {
  //   // Validate request
  //   await ctx.request.validate({
  //     schema: schema.create({
  //       old_password: schema.string({}, [rules.minLength(3)]),
  //       password: schema.string({}, [rules.confirmed(), rules.minLength(3)]),
  //     }),
  //     messages: validationMessages,
  //     reporter: validator.reporters.vanilla,
  //   })

  //   const user = ctx.auth.user!
  //   try {
  //     const oldPassword = ctx.request.all().old_password
  //     const newPassword = ctx.request.all().password
  //     await ctx.auth.logout()

  //     await ctx.auth.attempt(user.email, oldPassword)
  //     user.password = newPassword
  //     await user.save()

  //     await NotificationsHelper.sendPersistent(user.id, 'Password successfully updated', {
  //       state: 'success',
  //       url: '/u/me',
  //     })

  //     return FeedbackHelper.goBackWithMessage(ctx, 'Password successfully updated', 'success')
  //   } catch (error) {
  //     console.log(error)
  //     await ctx.auth.login(user)
  //     ctx.session.flash({
  //       old_password: ctx.request.input('old_password'),
  //       errors: {
  //         old_password: 'Wrong Password',
  //       },
  //     })
  //     return ctx.response.redirect('back')
  //   }
  // }

  /* --------------------------- UPDATE INFORMATION --------------------------- */
  // async updateInformation(ctx: HttpContextContract) {
  //   try {
  //     const user: User = ctx.auth.user!
  //     const name = ctx.request.all().name
  //     const dob = ctx.request.all().dob
  //     const location = ctx.request.all().location
  //     if (!user) {
  //       return FeedbackHelper.goBackWithMessage(ctx, 'You are not authorized', 'error')
  //     }
  //     user.name = name ? name : user.name
  //     user.dob = dob ? stringToModelDate(dob) : user.dob
  //     user.location = location && location !== '0' ? location : user.location
  //     await user.save()

  //     return FeedbackHelper.goBackWithMessage(ctx, 'Profile successfully updated', 'success')
  //   } catch (error) {
  //     console.log(error)
  //     ctx.session.flash({ error: 'Something went wrong' })
  //     return ctx.response.redirect('back')
  //   }
  // }

  /* --------------------- DELETE INDIVIDUAL USER AND HIS INFORMATION -------------------- */
  // async deleteUser(ctx: HttpContextContract) {
  //   try {
  //     const user = await User.find(ctx.auth.user!.id)
  //     const email = user!.email
  //     const individualUser = user!.organizationId === null
  //     if (individualUser) {
  //       const password = ctx.request.all().password_confirmation
  //       // Attempt to login
  //       await ctx.auth.attempt(email, password)
  //       deleteUser(ctx.auth.user!.id)
  //       return ctx.response.redirect('/auth/login')
  //     }

  //     return FeedbackHelper.goBackWithMessage(
  //       ctx,
  //       'Only an individual user can delete his account!',
  //       'error'
  //     )
  //   } catch (error) {
  //     return FeedbackHelper.handleError(ctx, error)
  //   }
  // }
}
