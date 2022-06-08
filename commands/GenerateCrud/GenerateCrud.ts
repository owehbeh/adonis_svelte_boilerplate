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
    const listViewTemplateName = `model_list.svelte`
    const controllerTemplateName = `model_controller.ts`
    const viewsPagesPath = `resources/js/pages`
    const generatedListViewName = `list.svelte`
    const generatedSingleViewName = `single.svelte`
    const generatedEditAddViewName = `editAdd.svelte`
    const controllerPath = `app/Controllers/Http`
    let controllerName = `${myModelTitle}sController`
    let controllerFilePath = `${controllerPath}/${controllerName}.ts`
    const listApiName = `${myModelName}ListView`
    const singleApiName = `${myModelName}SingleView`
    const editAddApiName = `${myModelName}EditAddView`
    const deleteApiName = `${myModelName}Delete`
    const permissionsJsonPath = `app/Helpers/Permission/permissions.json`

    // SECTION LIST VIEW
    // Load template
    const generatedListViewPath = this.generateListView(
      templatesPath,
      listViewTemplateName,
      myModelProps,
      myModelName,
      myModelTitle,
      viewsPagesPath,
      generatedListViewName
    )
    // SECTION SINGLE VIEW
    let generatedSingleViewPath = ''
    // SECTION EDIT/ADD VIEW
    let generatedEditAddViewPath = ''
    // SECTION PERMISSIONS
    this.updatePermissions(myModelTitle, permissionsJsonPath)
    // SECTION CONTROLLER
    // Load template
    let controllerResult = this.generateController(
      templatesPath,
      controllerTemplateName,
      controllerFilePath,
      controllerName,
      controllerPath,
      myModelName,
      listApiName,
      singleApiName,
      editAddApiName,
      generatedListViewName,
      generatedSingleViewName,
      generatedEditAddViewName,
      myModel
    )
    controllerName = controllerResult.controllerName
    controllerFilePath = controllerResult.controllerFilePath
    // SECTION Guides
    await this.openGuides(
      templatesPath,
      generatedListViewPath,
      generatedSingleViewPath,
      generatedEditAddViewPath,
      controllerFilePath,
      controllerName,
      listApiName,
      singleApiName,
      editAddApiName,
      deleteApiName,
      myModelName
    )
  }

  private updatePermissions(myModelTitle: any, permissionsJsonPath: string) {
    const MY_MODAL = myModelTitle.toUpperCase()
    let permissions = JSON.parse(fs.readFileSync(permissionsJsonPath, 'utf8'))
    permissions[`VIEW_${MY_MODAL}S`] = `View ${myModelTitle}s`
    permissions[`CREATE_${MY_MODAL}S`] = `Create ${myModelTitle}s`
    permissions[`EDIT_${MY_MODAL}S`] = `Edit ${myModelTitle}s`
    permissions[`DELETE_${MY_MODAL}S`] = `Delete ${myModelTitle}s`
    if (fs.existsSync(permissionsJsonPath)) {
      fs.writeFileSync(
        permissionsJsonPath,
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

  private async openGuides(
    templatesPath: string,
    generatedListViewPath: string,
    generatedSingleViewPath: string,
    generatedEditAddViewPath: string,
    controllerFilePath: string,
    controllerName: string,
    listApiName: string,
    singleApiName: string,
    editAddApiName: string,
    deleteApiName: string,
    myModelName: string
  ) {
    var guidesTemplateFile = fs.readFileSync(`${templatesPath}/guides.html`, 'utf-8')
    const guidesTemplate = Handlebars.compile(guidesTemplateFile, { noEscape: true })
    const guidesContents = guidesTemplate({
      view_paths: `Listview path: ${generatedListViewPath}\n      Singleview path: ${generatedSingleViewPath}\n      Listview path: ${generatedEditAddViewPath}\n`,
      controller_path: controllerFilePath,
      routes: `
      Route.group(() => {
        Route.get('/', '${controllerName}.${listApiName}')
        Route.get('/:id', '${controllerName}.${singleApiName}')
        Route.get('/:id?', '${controllerName}.${editAddApiName}')
        Route.post('/:id?', '${controllerName}.${editAddApiName.replace('View', '')}')
        Route.delete('/:id?', '${controllerName}.${deleteApiName}')
      })
      .prefix('${myModelName}s/')
        .middleware(['auth'])
      `,
    })
    // Make sure path sxist
    ensureExists(`tmp/generateCrud/`)
    // Write content to disk
    const guidesViewPath = `tmp/generateCrud/${myModelName}_guide.html`
    fs.writeFileSync(guidesViewPath, guidesContents, function (err) {
      if (err) {
        return console.log(err)
      }
    })
    // Open then delete the guide file
    await open(guidesViewPath, { wait: true })
    await fsExtra.remove('tmp/generateCrud/')
  }

  private generateController(
    templatesPath: string,
    controllerTemplateName: string,
    controllerFilePath: string,
    controllerName: string,
    controllerPath: string,
    myModelName: string,
    listApiName: string,
    singleApiName: string,
    editAddApiName: string,
    generatedListViewName: string,
    generatedSingleViewName: string,
    generatedEditAddViewName: string,
    myModel: any
  ) {
    var controllerTemplateFile = fs.readFileSync(
      `${templatesPath}/${controllerTemplateName}`,
      'utf-8'
    )
    const controllerTemplate = Handlebars.compile(controllerTemplateFile, { noEscape: true })
    // Make sure file does not sxist
    if (fs.existsSync(controllerFilePath)) {
      controllerName = `RenameMe${controllerName}`
      controllerFilePath = `${controllerPath}/${controllerName}.ts`
    }
    // Build relations query include string
    let modelRelations = ''
    Object.keys(myModel.properties).forEach((prop) => {
      const currentProp = myModel.properties[prop]
      const isTypeOfArray = currentProp.type && currentProp.type === 'array'
      const isTypeOfAnyOf = currentProp.anyOf
      if (isTypeOfArray || isTypeOfAnyOf) modelRelations += `${prop}:true, `
    })
    // Create list content
    const controllerContent = controllerTemplate({
      model_name: myModelName,
      list_api_name: listApiName,
      single_api_name: singleApiName,
      edit_delete_api_name: editAddApiName,
      list_view_path: `${myModelName}/${generatedListViewName.replace('.svelte', '')}`,
      single_view_path: `${myModelName}/${generatedSingleViewName.replace('.svelte', '')}`,
      edit_delete_view_path: `${myModelName}/${generatedEditAddViewName.replace('.svelte', '')}`,
      controller_name: controllerName,
      model_relations: modelRelations,
    })
    // Write content to disk
    fs.writeFileSync(controllerFilePath, controllerContent, { enconding: null }, function (err) {
      if (err) {
        return console.log(err)
      }
    })
    return { controllerFilePath, controllerName }
  }

  private generateListView(
    templatesPath: string,
    listViewTemplateName: string,
    myModelProps: any,
    myModelName: string,
    myModelTitle: string,
    viewsPagesPath: string,
    generatedListViewName: string
  ) {
    var listViewTemplateFile = fs.readFileSync(`${templatesPath}/${listViewTemplateName}`, 'utf-8')
    const listViewTemplateHandlebar = Handlebars.compile(listViewTemplateFile, { noEscape: true })
    // Build table titles
    let tableTitles = ''
    let tableValues = ''
    Object.keys(myModelProps).forEach((propKey) => {
      const currentProperty = myModelProps[propKey]
      tableTitles += `<th>${propKey}</th>\n`
      let valueToSet = ''
      switch (currentProperty.type) {
        case 'string':
          valueToSet = `<td>{${myModelName}.${propKey}}</td>\n`
          break
        case 'boolean':
          valueToSet = `<td>{${myModelName}.${propKey}}</td>\n`
          break
        case 'array':
          valueToSet = `<td>{${myModelName}.${propKey}?.length}</td>\n`
          break
        case Array:
          valueToSet = `<td>{${myModelName}.${propKey}?.length}</td>\n`
          break
        default:
          if (currentProperty.anyOf)
            valueToSet = `<td><a href="/${propKey}s/{${myModelName}.${propKey}.id}">{${myModelName}.${propKey}.id}</a></td>\n`
          else valueToSet = `<td>{${myModelName}.${propKey}}</td>\n`
          break
      }
      tableValues += valueToSet
    })
    // Build table values
    // Create list content
    const listViewContent = listViewTemplateHandlebar({
      model_name_title: myModelTitle,
      model_name: myModelName,
      table_titles: tableTitles,
      table_values: tableValues,
    })
    // Make sure path sxist
    ensureExists(`${viewsPagesPath}/${myModelName}/`)
    // Write content to disk
    const generatedListViewPath = `${viewsPagesPath}/${myModelName}/${generatedListViewName}`
    fs.writeFileSync(generatedListViewPath, listViewContent, { enconding: null }, function (err) {
      if (err) {
        return console.log(err)
      }
    })
    return generatedListViewPath
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
