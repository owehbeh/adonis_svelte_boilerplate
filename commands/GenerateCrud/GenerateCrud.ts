import { BaseCommand } from '@adonisjs/core/build/standalone'
import * as jsonModels from '../../prisma/json-schema/json-schema.json'
// import * as permissions from '../../app/Helpers/Permission/permissions.json'
/**
 * For opening and deleting guide files
 */
const open = require('open')
const fsExtra = require('fs-extra')
/**
 * HOW TO TEMPLATE HTML FILES
 * https://stackoverflow.com/questions/39962913/write-file-from-a-template-in-node-js
 */
const fs = require('fs')
const Handlebars = require('handlebars')

export default class GenerateCrud extends BaseCommand {
  public static commandName = 'generate:crud'
  public static description = 'Generate a controller and views for models'

  public static settings = {
    loadApp: false,
    stayAlive: false,
  }

  /* -------------------------------------------------------------------------- */
  /*                                  MAIN CODE                                 */
  /* -------------------------------------------------------------------------- */
  public async run() {
    /* ------------------------ ASK USER TO SELECT MODEL ------------------------ */
    const myModelTitle = await this.prompt.choice(
      'Select the model you want to generate CRUD for',
      Object.keys(jsonModels.definitions)
    )
    const myModel = jsonModels.definitions[myModelTitle]
    const myModelProps = myModel.properties
    const myModelName = myModelTitle.toLocaleLowerCase()
    const templatesPath = `commands/GenerateCrud/templates`
    const listViewTemplateName = `list.svelte`
    const singleViewTemplateName = `single.svelte`
    const editAddViewTemplateName = `edit_add.svelte`
    const formTextBlockTemplateName = `blocks/form_text_block.svelte`
    const formSelectBlockTemplateName = `blocks/form_select_block.svelte`
    const formMultiSelectBlockTemplateName = `blocks/form_multiselect_block.svelte`
    const formCheckboxBlockTemplateName = `blocks/form_checkbox_block.svelte`
    const singleTextBlockTemplateName = `blocks/single_text_block.svelte`
    const modalListBlockTemplateName = `blocks/modal_list_block.svelte`
    const controllerTemplateName = `controller.ts`
    const viewsPagesPath = `resources/js/pages`
    const generatedListViewName = `list.svelte`
    const generatedSingleViewName = `single.svelte`
    const generatedEditAddViewName = `editAdd.svelte`
    const controllerPath = `app/Controllers/Http`
    const controllerName = `${myModelTitle}sController`
    const controllerFilePath = `${controllerPath}/${controllerName}.ts`
    const listApiName = `${myModelName}ListView`
    const singleApiName = `${myModelName}SingleView`
    const editAddApiName = `${myModelName}EditAddView`
    const deleteApiName = `${myModelName}Delete`
    const permissionsJsonPath = `app/Helpers/Permission/permissions.json`
    let myValues = {
      myModelTitle,
      myModel,
      myModelProps,
      myModelName,
      templatesPath,
      listViewTemplateName,
      singleViewTemplateName,
      editAddViewTemplateName,
      formTextBlockTemplateName,
      formSelectBlockTemplateName,
      formMultiSelectBlockTemplateName,
      formCheckboxBlockTemplateName,
      singleTextBlockTemplateName,
      modalListBlockTemplateName,
      controllerTemplateName,
      viewsPagesPath,
      generatedListViewName,
      generatedSingleViewName,
      generatedEditAddViewName,
      controllerPath,
      controllerName,
      controllerFilePath,
      listApiName,
      singleApiName,
      editAddApiName,
      deleteApiName,
      permissionsJsonPath,
    }
    // SECTION LIST VIEW
    // Load template
    myValues['generatedListViewPath'] = this.generateListView(myValues)
    // SECTION SINGLE VIEW
    myValues['generatedSingleViewPath'] = this.generateSingleView(myValues)
    // SECTION EDIT/ADD VIEW
    myValues['generatedEditAddViewPath'] = this.generateEditAddView(myValues)
    // SECTION PERMISSIONS
    this.updatePermissions(myValues)
    // SECTION CONTROLLER
    // Load template
    let controllerResult = this.generateController(myValues)
    myValues.controllerName = controllerResult.controllerName
    myValues.controllerFilePath = controllerResult.controllerFilePath
    // SECTION Guides
    await this.openGuides(myValues)
  }

  private updatePermissions(val: any) {
    const MY_MODAL = val.myModelTitle.toUpperCase()
    let permissions = JSON.parse(fs.readFileSync(val.permissionsJsonPath, 'utf8'))
    permissions[`VIEW_${MY_MODAL}S`] = `View ${val.myModelTitle}s`
    permissions[`CREATE_${MY_MODAL}S`] = `Create ${val.myModelTitle}s`
    permissions[`EDIT_${MY_MODAL}S`] = `Edit ${val.myModelTitle}s`
    permissions[`DELETE_${MY_MODAL}S`] = `Delete ${val.myModelTitle}s`
    if (fs.existsSync(val.permissionsJsonPath)) {
      fs.writeFileSync(
        val.permissionsJsonPath,
        JSON.stringify(permissions),
        { enconding: null },
        function (err) {
          if (err) {
            return console.log(err)
          }
        }
      )
    }
  }

  private async openGuides(val) {
    var guidesTemplateFile = fs.readFileSync(`${val.templatesPath}/guides.html`, 'utf-8')
    const guidesTemplate = Handlebars.compile(guidesTemplateFile, { noEscape: true })
    const guidesContents = guidesTemplate({
      view_paths: `Listview path: ${val.generatedListViewPath}\n      Singleview path: ${val.generatedSingleViewPath}\n      Listview path: ${val.generatedEditAddViewPath}\n`,
      controller_path: val.controllerFilePath,
      routes: `
      Route.group(() => {
        Route.get('/', '${val.controllerName}.${val.listApiName}')
        Route.get('/:id', '${val.controllerName}.${val.singleApiName}')
        Route.get('/edit/:id?', '${val.controllerName}.${val.editAddApiName}')
        Route.post('/:id?', '${val.controllerName}.${val.editAddApiName.replace('View', '')}')
        Route.delete('/:id?', '${val.controllerName}.${val.deleteApiName}')
      })
      .prefix('${val.myModelName}s/')
        .middleware(['auth'])
      `,
    })
    // Make sure path sxist
    ensureExists(`tmp/generateCrud/`)
    // Write content to disk
    const guidesViewPath = `tmp/generateCrud/${val.myModelName}_guide.html`
    fs.writeFileSync(guidesViewPath, guidesContents, function (err) {
      if (err) {
        return console.log(err)
      }
    })
    // Open then delete the guide file
    await open(guidesViewPath, { wait: true })
    await fsExtra.remove('tmp/generateCrud/')
  }

  private generateController(val) {
    var controllerTemplateFile = fs.readFileSync(
      `${val.templatesPath}/${val.controllerTemplateName}`,
      'utf-8'
    )
    const controllerTemplate = Handlebars.compile(controllerTemplateFile, { noEscape: true })
    // Make sure file does not sxist
    if (fs.existsSync(val.controllerFilePath)) {
      val.controllerName = `RenameMe${val.controllerName}`
      val.controllerFilePath = `${val.controllerPath}/${val.controllerName}.ts`
    }
    // Build relations query include string
    let modelRelations = ''
    let relationLists = ''
    let editRelationVars = ''
    let editRelationVarsValues = ''
    let editRelationVarsUpdate = ''
    let editRelationVarsCreate = ''
    Object.keys(val.myModel.properties).forEach((prop) => {
      if (prop === 'id') return
      const currentProp = val.myModel.properties[prop]
      const isTypeOfArray = currentProp.type && currentProp.type === 'array'
      const isTypeOfAnyOf = currentProp.anyOf
      const isTypeOfString =
        currentProp.type && (currentProp.type === 'string' || currentProp.type[0] === 'string')
      const isTypeOfNumber =
        currentProp.type && (currentProp.type === 'number' || currentProp.type[0] === 'number')
      const isTypeOfBoolean =
        currentProp.type && (currentProp.type === 'boolean' || currentProp.type[0] === 'boolean')
      if (isTypeOfArray || isTypeOfAnyOf) {
        modelRelations += `${prop}:true, `
        relationLists += `relations['${prop}List'] = await prisma.${prop}.findMany()\n`
        if (isTypeOfArray) {
          editRelationVarsValues += `if (${prop}) ${prop} = ${prop}.split(',').map((x) => ({ id: x }))\nelse ${prop} = []\n`
          editRelationVarsUpdate += `${prop}: {set: [], connect: ${prop},},`
          editRelationVarsCreate += `${prop}: {connect: ${prop},},`
        } else {
          editRelationVarsCreate += `${prop}Id: ${prop},\n`
          editRelationVarsUpdate += `${prop}Id: ${prop},\n`
        }
      } else if (isTypeOfString || isTypeOfNumber) {
        editRelationVarsUpdate += `${prop},`
        editRelationVarsCreate += `${prop},`
      } else if (isTypeOfBoolean) {
        editRelationVarsUpdate += `${prop}:${prop} ? true : false,`
        editRelationVarsCreate += `${prop}:${prop} ? true : false,`
      }
      editRelationVars += `${prop}, `
    })
    // Create list content
    const controllerContent = controllerTemplate({
      model_name: val.myModelName,
      list_api_name: val.listApiName,
      single_api_name: val.singleApiName,
      edit_delete_api_name: val.editAddApiName,
      list_view_path: `${val.myModelName}/${val.generatedListViewName.replace('.svelte', '')}`,
      single_view_path: `${val.myModelName}/${val.generatedSingleViewName.replace('.svelte', '')}`,
      edit_delete_view_path: `${val.myModelName}/${val.generatedEditAddViewName.replace(
        '.svelte',
        ''
      )}`,
      controller_name: val.controllerName,
      model_relations: modelRelations,
      relation_lists: relationLists,
      edit_relation_vars: editRelationVars,
      edit_relation_vars_update: editRelationVarsUpdate,
      edit_relation_vars_create: editRelationVarsCreate,
      edit_relation_vars_values: editRelationVarsValues,
    })
    // Write content to disk
    fs.writeFileSync(
      val.controllerFilePath,
      controllerContent,
      { enconding: null },
      function (err) {
        if (err) {
          return console.log(err)
        }
      }
    )
    return val
  }

  private generateListView(val) {
    var listViewTemplateFile = fs.readFileSync(
      `${val.templatesPath}/${val.listViewTemplateName}`,
      'utf-8'
    )
    const listViewTemplateHandlebar = Handlebars.compile(listViewTemplateFile, { noEscape: true })
    // Build table titles
    let tableTitles = ''
    let tableValues = ''
    Object.keys(val.myModelProps).forEach((propKey) => {
      const currentProperty = val.myModelProps[propKey]
      tableTitles += `<th>{txt('${propKey}')}</th>\n`
      let valueToSet = ''
      switch (currentProperty.type) {
        case 'string':
          valueToSet = `<td><a href="/${val.myModelName}s/{${val.myModelName}.id}">{${val.myModelName}.${propKey}}</a></td>\n`
          break
        case 'boolean':
          valueToSet = `<td>{${val.myModelName}.${propKey}}</td>\n`
          break
        case 'array':
          valueToSet = `<td>{${val.myModelName}.${propKey}?.length}</td>\n`
          break
        case Array:
          valueToSet = `<td>{${val.myModelName}.${propKey}?.length}</td>\n`
          break
        default:
          if (currentProperty.anyOf)
            valueToSet = `<td><a href="/${propKey}s/{${val.myModelName}.${propKey}.id}">{${val.myModelName}.${propKey}.id}</a></td>\n`
          else valueToSet = `<td>{${val.myModelName}.${propKey}}</td>\n`
          break
      }
      tableValues += valueToSet
    })
    // Build table val
    // Create list content
    const listViewContent = listViewTemplateHandlebar({
      model_name_title: val.myModelTitle,
      model_name: val.myModelName,
      table_titles: tableTitles,
      table_values: tableValues,
    })
    // Make sure path sxist
    ensureExists(`${val.viewsPagesPath}/${val.myModelName}/`)
    // Write content to disk
    const generatedListViewPath = `${val.viewsPagesPath}/${val.myModelName}/${val.generatedListViewName}`
    fs.writeFileSync(generatedListViewPath, listViewContent, { enconding: null }, function (err) {
      if (err) {
        return console.log(err)
      }
    })
    return generatedListViewPath
  }

  private generateSingleView(val) {
    // Load single view template file
    var singleViewTemplateFile = fs.readFileSync(
      `${val.templatesPath}/${val.singleViewTemplateName}`,
      'utf-8'
    )
    const singleViewTemplateHandlebar = Handlebars.compile(singleViewTemplateFile, {
      noEscape: true,
    })
    // Load other related template files
    // Page text content for props
    var singleTextBlockTemplateFile = fs.readFileSync(
      `${val.templatesPath}/${val.singleTextBlockTemplateName}`,
      'utf-8'
    )
    const singleTextBlockTemplateHandlebar = Handlebars.compile(singleTextBlockTemplateFile, {
      noEscape: true,
    })
    // Page modal content for relations
    var modalListBlockTemplateFile = fs.readFileSync(
      `${val.templatesPath}/${val.modalListBlockTemplateName}`,
      'utf-8'
    )
    const modalListBlockTemplateHandlebar = Handlebars.compile(modalListBlockTemplateFile, {
      noEscape: true,
    })
    let modalsContent = ''
    let pageTextContent = ''
    Object.keys(val.myModelProps).forEach((propKey) => {
      const currentProperty = val.myModelProps[propKey]
      let valueToSet = ''
      switch (currentProperty.type) {
        case 'string':
          valueToSet = `{${val.myModelName}.${propKey}}`
          break
        case 'boolean':
          valueToSet = `{${val.myModelName}.${propKey}}`
          break
        case 'array':
          valueToSet = `<a href="#${val.myModelName}-${propKey}-modal" class="cursor-pointer">{txt('View')} ({${val.myModelName}.${propKey}?.length})</a>`
          modalsContent += modalListBlockTemplateHandlebar({
            model_name: val.myModelName,
            prop_name: propKey,
          })
          break
        case Array:
          valueToSet = `{${val.myModelName}.${propKey}?.length}`
          break
        default:
          if (currentProperty.anyOf)
            valueToSet = `<a href="/${propKey}s/{${val.myModelName}.${propKey}.id}">{${val.myModelName}.${propKey}.id}</a>`
          else valueToSet = `{${val.myModelName}.${propKey}}`
          break
      }
      pageTextContent += singleTextBlockTemplateHandlebar({
        prop_name: propKey,
        prop_value: valueToSet,
      })
    })
    // Create single content
    const singleViewContent = singleViewTemplateHandlebar({
      page_text_content: pageTextContent,
      model_name: val.myModelName,
      model_name_title: val.myModelTitle,
      modals_content: modalsContent,
    })
    // Make sure path sxist
    ensureExists(`${val.viewsPagesPath}/${val.myModelName}/`)
    // Write content to disk
    const generatedSingleViewPath = `${val.viewsPagesPath}/${val.myModelName}/${val.generatedSingleViewName}`
    fs.writeFileSync(
      generatedSingleViewPath,
      singleViewContent,
      { enconding: null },
      function (err) {
        if (err) {
          return console.log(err)
        }
      }
    )
    return generatedSingleViewPath
  }

  private generateEditAddView(val) {
    // Load single view template file
    var editAddViewTemplateFile = fs.readFileSync(
      `${val.templatesPath}/${val.editAddViewTemplateName}`,
      'utf-8'
    )
    const editAddViewTemplateHandlebar = Handlebars.compile(editAddViewTemplateFile, {
      noEscape: true,
    })
    let pageFormContent = ''
    Object.keys(val.myModelProps).forEach((propKey) => {
      // Load Page form content for props
      let tempBlockTemplateFile
      const currentProperty = val.myModelProps[propKey]
      switch (currentProperty.type) {
        case 'number':
        case 'string':
          tempBlockTemplateFile = fs.readFileSync(
            `${val.templatesPath}/${val.formTextBlockTemplateName}`,
            'utf-8'
          )
          break
        case 'boolean':
          tempBlockTemplateFile = fs.readFileSync(
            `${val.templatesPath}/${val.formCheckboxBlockTemplateName}`,
            'utf-8'
          )
          break
        case 'array':
          tempBlockTemplateFile = fs.readFileSync(
            `${val.templatesPath}/${val.formMultiSelectBlockTemplateName}`,
            'utf-8'
          )
          break
        case Array:
          tempBlockTemplateFile = fs.readFileSync(
            `${val.templatesPath}/${val.formMultiSelectBlockTemplateName}`,
            'utf-8'
          )
          break
        default:
          if (currentProperty.anyOf)
            tempBlockTemplateFile = fs.readFileSync(
              `${val.templatesPath}/${val.formSelectBlockTemplateName}`,
              'utf-8'
            )
          else
            tempBlockTemplateFile = fs.readFileSync(
              `${val.templatesPath}/${val.formTextBlockTemplateName}`,
              'utf-8'
            )
          break
      }
      const tempBlockTemplateHandlebar = Handlebars.compile(tempBlockTemplateFile, {
        noEscape: true,
      })
      pageFormContent += tempBlockTemplateHandlebar({
        prop_name: propKey,
        model_name: val.myModelName,
      })
    })
    // Create single content
    const editAddViewContent = editAddViewTemplateHandlebar({
      page_form_content: pageFormContent,
      model_name: val.myModelName,
      model_name_title: val.myModelTitle,
    })
    // Make sure path sxist
    ensureExists(`${val.viewsPagesPath}/${val.myModelName}/`)
    // Write content to disk
    const generatedEditAddViewPath = `${val.viewsPagesPath}/${val.myModelName}/${val.generatedEditAddViewName}`
    fs.writeFileSync(
      generatedEditAddViewPath,
      editAddViewContent,
      { enconding: null },
      function (err) {
        if (err) {
          return console.log(err)
        }
      }
    )
    return generatedEditAddViewPath
  }
}

/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */
function ensureExists(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }
}
