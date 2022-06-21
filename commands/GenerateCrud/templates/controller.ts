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

  public async {{edit_delete_api_name}}(ctx: HttpContextContract) {
    var {{ model_name }}
    var relations = {}
    const {{ model_name }}Id: string = ctx.request.params().id
    if ({{ model_name }}Id) {
      {{ model_name }} = await prisma.{{ model_name }}.findUnique({
        where: { id: {{ model_name }}Id },
        include: { {{model_relations}} }
      })
    }
    {{relation_lists}}
    return ctx.inertia.render('{{ model_name }}/editAdd', {
      {{ model_name }},
      relations,
    })
  }

  public async {{ model_name }}EditAdd(ctx: HttpContextContract) {
    var {{ model_name }}
    const {{ model_name }}Id: string = ctx.request.params().id
    let { {{edit_relation_vars}} } = ctx.request.body()
    {{edit_relation_vars_values}}

    {{ model_name }} = await prisma.{{ model_name }}.upsert({
      where: { id: {{ model_name }}Id || '' },
      update: {
        {{edit_relation_vars_update}}
      },
      create: {
        {{edit_relation_vars_create}}
      },
    })
    return ctx.response.redirect(`/{{ model_name }}s/${ {{ model_name }}Id}`)
  }

}
