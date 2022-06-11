import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'

export default class {{controller_name}} {
  public async {{ list_api_name }}(ctx: HttpContextContract) {
    let {{model_name}}List = await prisma.{{model_name}}.findMany({
      include: { {{model_relations}} },
    })
    return ctx.inertia.render('{{list_view_path}}', { {{model_name}}List })
  }

  public async {{single_api_name}}(ctx: HttpContextContract) {
    let {{ model_name }} = await prisma.{{ model_name }}.findUnique({
      where: { id: ctx.request.params().id },
      include: { {{model_relations}} }
    })
    return ctx.inertia.render('{{single_view_path}}', { {{model_name}} })
  }
}
