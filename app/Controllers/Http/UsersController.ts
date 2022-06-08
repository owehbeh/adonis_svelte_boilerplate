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
      const userToLogin = await prisma.user.findFirst({
        where: {
          email: email,
        },
      })
      // Validate Password
      const validPassword = userToLogin ? await Hash.verify(userToLogin.password, password) : false
      if (!validPassword)
        throw new Exception(
          `Email ${email} or password are wrong`,
          3333,
          NotificationTypeEnum.warning
        )

      // If user email is not validated
      await ctx.auth.use('web').login(userToLogin!)
      const user = ctx.auth.user!
      if (user.validated === false) await ctx.auth.logout()

      return ctx.response.redirect('/')
    } catch (error) {
      ctx.session.flash(error)
      ctx.session.flash({ loginError: 'These credentials do not work.' })
      return FeedbackHelper.handleErrorToRoute(ctx, error, '/login')
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

  public async usersView(ctx: HttpContextContract) {
    try {
    } catch (error) {
      FeedbackHelper.handleError(ctx, error)
    }
  }
}
