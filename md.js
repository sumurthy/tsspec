import FileOps from './modules/fileops'
import SetUp from './modules/setuproutine'
import Utils from './modules/utils'

let allTypes = {}
let allMembers = {}
let functionObj = {}
let iObj = {}
let classObj = {}
let moduleObj = {}
let enumObj = {}
let variableObj = {}
let typeObj = {}
let region = ''
let mdout = []
let mem_mdout = []
let funcMthd_mdout = []
let enum_mdout = []
let skipFlag = false
let moduleName = ''
let objectName = ''
let interfaceName = ''

let moduleT = []
let classInterfaceT = []
let methodfuncT = []
let enumT = []
let anchor = ''

let WRITE_BACK = ['#', '|', '*', '_', '%']

let TAKE_REPEAT_ACTION = ['>']
let NEW_REGION = ['<']
let IGNORE = ['/']
const BETA_MESSAGE = ' Note: This is being made avaiable in **beta** mode. This is not recommended for use in Production.'


function dclone(o) {
    if (o) {
        //Deep copy
        return JSON.parse(JSON.stringify(o))
    }
    return o
}

function file_reset() {
    functionObj = {}
    iObj = {}
    classObj = {}
    enumObj = {}
    region = ''
    mdout = []
    mem_mdout = []
    funcMthd_mdout = []
    enum_mdout = []
    skipFlag = false
}

function adjustMdLink(val='', adjustLink=false) {
    if (adjustLink && val) {
        val = val.replace('..','.')
    }
    return val
}

function getLinkForType(type = '', adjustLink = false) {

    var out = ''
    if (!type) return out
    var splitChar = ','
    var type = Utils.replaceCommaInGenerics(type)
    if (type.includes('|')) {
        splitChar = '|'
    }
    //type.split(/\W+/).forEach((e) => {
    type.split(splitChar).forEach((e) => {
        var targetLink = allTypes[e.trim()]
        targetLink = adjustMdLink(targetLink, adjustLink)
        // try as is for a match
        if (Object.keys(allTypes).includes(e.trim())) {
            out = out + `[\`${e}\`](${targetLink})` + ','
        }
        // try trimming the generics
        else if (Object.keys(allTypes).includes(Utils.trimGenerics(e,true))) {
            var o = Utils.trimGenerics(e,true) //first part
            var g = Utils.inParen(e,true) //generics link

            targetLink = adjustMdLink(allTypes[o], adjustLink)
            e = e.replace(o, `[\`${o}\`](${targetLink})`)
            if (g) {
                targetLink = allTypes[g]
                targetLink = adjustMdLink(targetLink, adjustLink)
                if (Object.keys(allTypes).includes(g)) {
                    e = e.replace(g, `[\`${g}\`](${targetLink})`)
                }
            }
            out = out + e + ','
        }
        // variables and types match
        else if (Object.keys(allMembers).includes(Utils.trimGenerics(e,true))) {
            out = out + `[\`${e}\`](${allMembers[Utils.trimGenerics(e,true)].toLowerCase()})` + ','
        }
        // objectName.method name match
        else if (Object.keys(allMembers).includes(Utils.trimGenerics(e.toLowerCase(),true))) {
            out = out + `[\`${e}\`](${allMembers[Utils.trimGenerics(e)].toLowerCase()})` + ','
        }
        else {
            out = out + '`' + e + '`' + ','
        }
    })
    out = out.trim()
    if (out.endsWith(',')) {
        out = out.substring(0, out.length - 1)
    }
    return out.replace(/\^/g, ',')
}

function getSmartLink(str = '') {
    var out = ''
    if (!str) return out
    var replacePairs = {}
    str.split(/\W+/).forEach((e) => {
        if (Object.keys(allTypes).includes(e)) {
            replacePairs[e] = allTypes[e]
        } else if (Object.keys(allTypes).includes(e)) {
            replacePairs[e] = allTypes[e]
        }
    })
    Object.keys(replacePairs).forEach((e) => {
        str = str.replace(e, `[${e}](${replacePairs[e]})`)
    })
    return str
}


function set_region_member(tline = '', member = {}, isClass = true) {
    skipFlag = false
    if (tline.includes('</')) {
        region = 'none'
    } else {
        region = Utils.genericInside(tline).replace('/', '')
        switch (region) {
            case 'function':
            case 'method':
                if (!isClass) {
                    skipFlag = true
                }
                break;
            case 'imethod':
            case 'variable':
            case 'ifunction':
                if (isClass) {
                    skipFlag = true
                }
                break;
            case 'parameter':
                if (member['params'].length === 0) {
                    skipFlag = true
                }
                break;
            case 'remarks':
                if (!member['remarks']) {
                    skipFlag = true
                }
                break;
            default:
        }
    }
    return
}

function set_region(tline = '', obj = {}, localName = '', isClass = true) {

    skipFlag = false
    if (tline.includes('</')) {
        region = 'none'
    } else {
        region = Utils.genericInside(tline).replace('/', '')
        switch (region) {
            case 'class':
                if (Object.keys(classObj).length === 0) {
                    skipFlag = true
                }
                break;
            case 'module':
                if (Object.keys(moduleObj).length === 0) {
                    skipFlag = true
                }
                break;
            case 'property':
                if (!isClass) {
                    skipFlag = true
                }
                if (Object.keys(obj[localName]['properties']).length === 0) {
                    skipFlag = true
                }
                break;
            case 'iproperty':
                if (isClass) {
                    skipFlag = true
                }
                if (Object.keys(obj[localName]['properties']).length === 0) {
                    skipFlag = true
                }
                break;
            case 'imethod':
                if (isClass) {
                    skipFlag = true
                }
                if (Object.keys(obj[localName]['methods']).length === 0) {
                    skipFlag = true
                }
                break;
            case 'constructor':
                if (Object.keys(obj[localName]['constructor']).length === 0) {
                    skipFlag = true
                }
                break;
            case 'method':
                if (!isClass) {
                    skipFlag = true
                }
                if (Object.keys(obj[localName]['methods']).length === 0) {
                    skipFlag = true
                }
                break;
            case 'interface':
                if (Object.keys(iObj).length === 0) {
                    skipFlag = true
                }
                break;
            case 'functions':
                if (Object.keys(functionObj).length === 0) {
                    skipFlag = true
                }
                break;
            case 'ifunction':
                if (Object.keys(obj[localName]['functions']).length === 0) {
                    skipFlag = true
                }
                break;
            case 'typedef':
                if (Object.keys(typeObj).length === 0) {
                    skipFlag = true
                }
                break;
            case 'variable':
                if (Object.keys(variableObj).length === 0) {
                    skipFlag = true
                }
                break;
            case 'variables':
                if (Object.keys(obj[localName]['variables']).length === 0) {
                    skipFlag = true
                }
                break;
            case 'enumeration':
                if (Object.keys(enumObj).length === 0) {
                    skipFlag = true
                }
                break;
            case 'remarks':
                if (!obj[localName]['remarks']) {
                    skipFlag = true
                }
                break;
            case 'parameter':
                if (Object.keys(classObj).length === 0) {
                    skipFlag = true
                }
                break;

            default:
        }
    }

    return
}


function doSub(tline = '') {
    if (tline.includes('%module%')) tline = tline.replace('%module%', moduleName)
    if (tline.includes('%resourcename%')) tline = tline.replace('%resourcename%', objectName)
    return tline
}


function doSubClassInterface(tline = '', localO = {}, localName = '', isClass = true, isModule = false) {

    if (tline.includes('%resourcedescription%')) tline = tline.replace('%resourcedescription%', localO[localName]['descr'])
    if (tline.includes('%betatext%')) {
        if (localO[localName]['showBetaMessage'] || localO[localName]['isBeta'] ) {
            tline = tline.replace('%betatext%', 'This is in beta mode')
        }
        else {
            tline = tline.replace('%betatext%', '')
        }
    }

    if (tline.includes('%resourcename%')) tline = tline.replace('%resourcename%', localName)
    if (tline.includes('%resourcetype%')) {
        if (isClass) {
            tline = tline.replace('%resourcetype%', ' class')
        } else {
            if (isModule) {
                    tline = tline.replace('%resourcetype%', ' module')
            } else {
                tline = tline.replace('%resourcetype%', ' interface')
            }
        }

    }
    if (tline.includes('%generictype%')) {
        if (localO[localName]['genericType']) {
            tline = tline.replace('%generictype%', ` <${localO[localName]['genericType']}>`)
        }
        else {
            tline = tline.replace('%generictype%', '')
        }
    }
    if (tline.includes('%typeparameters%')) {
        if (localO[localName]['genericType']) {
            tline = tline.replace('%typeparameters%', `_Type parameters: \`<${localO[localName]['genericType']}>\`_`)
        }
        else {
            tline = tline.replace('%typeparameters%', '')
        }
    }
    if (tline.includes('%extendsimplements%')) {
        if (localO[localName]['implementsExtendsName']) {
            var ielink = getLinkForType(localO[localName]['implementsExtendsName'])
            var tag = (isClass) ? 'Implements' : 'Extends'
            tline = tline.replace('%extendsimplements%',
                        `_${tag}: ${ielink}_`)
        }
        else {
            tline = tline.replace('%extendsimplements%', '')
        }
    }
    if (tline.includes('%constdesc%')) {
        tline = tline.replace('%constdesc%', localO[localName]['constructor']['descr'])
    }
    if (tline.includes('%constsignature%')) {
        tline = tline.replace('%constsignature%', getSmartLink(localO[localName]['constructor']['signature']))
    }
    if (tline.includes('%constrtype%')) {
        tline = tline.replace('%constrtype%', `${getLinkForType(localO[localName]['constructor']['returnType'])}`)
    }
    if (tline.includes('%constreturndescr%')) {
        tline = tline.replace('%constreturndescr%', localO[localName]['constructor']['returnDescr'])
    }
    if (tline.includes('%cnoparam%')) {
        if (localO[localName]['constructor']['params'].length === 0) {
            tline = tline.replace('%cnoparam%', 'None')
        } else {
            tline = tline.replace('%cnoparam%', '')
        }
    }
    if (tline.includes('%remarks%')) {
        tline = tline.replace('%remarks%', localO[localName]['remarks'])
    }
    return tline
}

function doSubMember(tline = '', member = {}, membername = '', isClass = true, ownFile = false) {

    if (tline.includes('%hashcount%')) {
        if (ownFile) {
            tline = tline.replace('%hashcount%', '#')
        } else {
            tline = tline.replace('%hashcount%', '###')
        }
    }
    //if (tline.includes('%membername%')) tline = tline.replace('%membername%', membername.split('-')[0])
    if (tline.includes('%membername%')) tline = tline.replace('%membername%', member['docName'])
    if (tline.includes('%memberdescription%')) tline = tline.replace('%memberdescription%', member['descr'])

    if (tline.includes('%betatext%')) {
        if (member['showBetaMessage'] || member['isBeta']) {
            tline = tline.replace('%betatext%', BETA_MESSAGE)
        }
        else {
            tline = tline.replace('%betatext%', '')

        }
    }

    if (tline.includes('%apisignature%')) tline = tline.replace('%apisignature%', getSmartLink(member['signature']))

    if (tline.includes('%noparam%')) {
        if (member['params'].length === 0) {
            tline = tline.replace('%noparam%', 'None')
        } else {
            tline = tline.replace('%noparam%', '')
        }
    }
    if (tline.includes('%returntype%')) tline = tline.replace('%returntype%', `${getLinkForType(member['returnType'])}`)
    if (tline.includes('%returndescr%')) tline = tline.replace('%returndescr%', `${member['returnDescr']}`)
    if (tline.includes('%remarks%')) tline = tline.replace('%remarks%', `${member['remarks']}`)

    return tline
}


var dFunction = {

    classGenIndividual: function(e = '') {
        objectName = e
        genClassInterfaceModuleView(true, e, false)
        return
    },
    interfaceGenIndividual: function(e = '') {
        objectName = e
        genClassInterfaceModuleView(false, e, false)
        return
    },
    moduleGenIndividual: function(e = '') {
        objectName = e
        genClassInterfaceModuleView(false, e, true)
        return
    },
    functionsGenIndividual: function(e = '') {
        genMemberview(e, functionObj[e], funcMthd_mdout, false, true)
        console.log(`*** Writing Function file for ${e}`)
        FileOps.writeFile(funcMthd_mdout, `./markdown/${anchor}/${Utils.trimGenerics(e)}.md`)
        funcMthd_mdout = []
        return
    },
    enumerationGenIndividual: function(e = '') {
        genEnumView(e)
        return
    },
    typedefGenIndividual: function(e = '') {

    },
    variableGenIndividual: function(e = '') {

    }
}

function addRegions(tline = '', type = '') {
    var o = {}
    switch (type) {
        case 'class':
            o = classObj
            break;
        case 'module':
            o = moduleObj
            break;
        case 'interface':
            o = iObj
            break;
        case 'functions':
            o = functionObj
            break;
        case 'enumeration':
            o = enumObj
            break;
        case 'typedef':
            o = typeObj
            break;
        case 'variable':
            o = variableObj
            break;
        default:

    }

    Object.keys(o).forEach((e) => {
        var mline = dclone(tline).substr(1)
        mline = mline.replace('%name%', e)
        // mline = mline.replace('%namehyphen%', e.split('-')[0])
        mline = mline.replace('%namefunc%', `${o[e]['docName']}`)

        mline = mline.replace('%type%', `${getLinkForType(o[e]['dataType'])}`)
        mline = mline.replace('%link%', `./${anchor}/${e.replace(/'/g,'').toLowerCase()}`)
        var descr = o[e]['descr']
        if (descr) {
            //descr = descr.split('.')[0].replace(/\n/g, ' ')
            descr = descr.replace(/\n/g, ' ')
        }

        mline = mline.replace('%description%', descr)
        mline = mline.replace('%shortdescription%', descr)

            // For return function add Markdown HyperLink
        if (type === 'functions') {
            var returnLink = getLinkForType(o[e]['returnType'], true)
            mline = mline.replace('%returns%', returnLink)
        }
        mdout.push(mline)
            // Dynamically call the function to generate the individual md files
        dFunction[`${type}GenIndividual`](e)

    })
}

function addMembers(tline = '', type = '', name = '', localO = {}) {
    var o = {}
    switch (type) {
        case 'property':
        case 'iproperty':
            o = localO[name]['properties']
            break;
        case 'method':
        case 'imethod':
            o = localO[name]['methods']
            break;
        case 'ifunction':
            o = localO[name]['functions']
            break;
        case 'variables':
            o = localO[name]['variables']
            break;
        default:
    }
    Object.keys(o).forEach((e) => {

        var mline = dclone(tline).substr(1)
        if (o[e]['isStatic']) {
            mline = mline.replace('%access%', `\`${o[e]['accessModifier']}, static\``)
        }
        else {
            mline = mline.replace('%access%', `\`${o[e]['accessModifier']}\``)
        }
        if (o[e]['readonly']) {
            mline = mline.replace('%readonly%', `_Read-only._ `)
        }
        else {
            mline = mline.replace('%readonly%', '')
        }
        if ((type === 'method') || type === 'imethod') {
            mline = mline.replace('%type%', `${getLinkForType(o[e]['returnType'])}`)
            ///mline = mline.replace('%name%', `[\`${e.split('-')[0]}\`](#${e.split('-')[0].toLowerCase()})`)
            // mline = mline.replace('%name%', `[\`${o[e]['docName']}\`](#${o[e]['mdLink']})`)
            mline = mline.replace('%name%', `[\`${o[e]['docName']}\`](${e.toLowerCase()}.md)`)
        } else {
            mline = mline.replace('%name%', e.split('-')[0])
            mline = mline.replace('%type%', `${getLinkForType(o[e]['dataType'])}`)
        }

        var descr = o[e]['descr']
        if (descr) {
            //descr = descr.split('.')[0].replace(/\n/g, ' ')
            descr = descr.replace(/\n/g, ' ')
        }
        mline = mline.replace('%description%', descr)
        mem_mdout.push(mline)
    })
}

function addParams(tline = '', member = {}, targetArray = []) {
    member['params'].forEach((e) => {
        var mline = dclone(tline).substr(1)
        mline = mline.replace('%name%', e['name'])
        mline = mline.replace('%dtype%', `${getLinkForType(e['dataType'])}`)
        if (e['isOptional']) {
            mline = mline.replace('%optional% ', 'Optional.')
        }
        else {
            mline = mline.replace('%optional% ', '')
        }
        var descr = e['descr']
        //Get first sentence
        if (descr) {
        //     descr = descr.split('.')[0].replace(/\n/g, ' ')
            descr = descr.replace(/\n/g, ' ')
        }
        mline = mline.replace('%description%', descr)
            // if (member['parameters'][e]['descr']) {
            //                            mline = mline.replace('%optional%', 'Optional.')
            // }
            // else {
            //            mline = mline.replace('%optional%', '')
            // }

        targetArray.push(mline)
    })
}

function genClassInterfaceModuleView(isClass = true, localName = '', isModule = false) {
    var localO = isClass ? classObj : iObj
    if (isModule) {
        localO = moduleObj
    }
    mem_mdout = []
    var o = localO[localName]
        //var o = classObj[objectName]

    classInterfaceT.forEach((tline) => {
        tline = tline.trim()
        var key = tline[0] || '*'
        var key2 = tline.substring(0, 2)
        if (NEW_REGION.includes(key)) {
            set_region(tline, localO, localName, isClass)
            return
        }
        if (skipFlag) return
        var hasVar = tline.includes('%') ? true : false

        if (WRITE_BACK.includes(key)) {
            if (hasVar) tline = doSubClassInterface(tline, localO, localName, isClass, isModule)
            mem_mdout.push(tline)
        } else if (TAKE_REPEAT_ACTION.includes(key)) {
            switch (region) {
                case 'property':
                case 'method':
                case 'function':
                case 'ifunction':
                case 'variable':
                case 'imethod':
                case 'iproperty':
                case 'variables':
                    addMembers(tline, region, localName, localO)
                    break;
                case 'constructor':
                    addParams(tline, o['constructor'], mem_mdout)
                    break;
                default:
            }
        }
    })

    if (Object.keys(localO[localName]['methods']).length > 0) {
        Object.keys(localO[localName]['methods']).forEach((e) => {
            // genMemberview(e, localO[localName]['methods'][e], mem_mdout, isClass)
            genMemberview(e, localO[localName]['methods'][e], funcMthd_mdout, isClass, true)
            console.log(`*** Writing Method file for ${e}`)
            FileOps.writeFile(funcMthd_mdout, `./markdown/${anchor}/${Utils.trimGenerics(e)}.md`)
            funcMthd_mdout = []
        })
    }

    if (!isClass && (Object.keys(localO[localName]['functions']).length > 0)) {
        Object.keys(localO[localName]['functions']).forEach((e) => {
            genMemberview(e, localO[localName]['functions'][e], mem_mdout, isClass)
        })
    }

    console.log(`*** Writing Class/Interface/Module file for ${localName}`)
    if (!isModule) {
        FileOps.writeFile(mem_mdout, `./markdown/${anchor}/${Utils.trimGenerics(localName)}.md`)
    } else {
        FileOps.writeFile(mem_mdout, `./markdown/${anchor}/${Utils.trimGenerics(localName)}-imodule.md`)
    }

}

function genMemberview(memName = '', member = {}, targetArray = [], isClass = true, ownFile = false) {

    methodfuncT.forEach((tline) => {
        tline = tline.trim()
        var key = tline[0] || '*'
        var key2 = tline.substring(0, 2)
        if (NEW_REGION.includes(key)) {
            set_region_member(tline, member, isClass)
            return
        }

        if (skipFlag) {
            return
        }

        var hasVar = tline.includes('%') ? true : false
        if (WRITE_BACK.includes(key)) {
            if (hasVar) {
                tline = doSubMember(tline, member, memName, isClass, ownFile)
            }
            targetArray.push(tline)
        } else if (TAKE_REPEAT_ACTION.includes(key)) {
            addParams(tline, member, targetArray)
        }
    })
}

function genExtModuleView() {
    moduleT.forEach((tline) => {
        tline = tline.trim()
        var key = tline[0] || '*'
        var key2 = tline.substring(0, 2)

        if (NEW_REGION.includes(key)) {
            set_region(tline)
            return
        }

        if (skipFlag) { //why do we need this?
            return
        }

        var hasVar = tline.includes('%') ? true : false

        if (WRITE_BACK.includes(key)) {

            if (hasVar) tline = doSub(tline)

            mdout.push(tline)
        } else if (TAKE_REPEAT_ACTION.includes(key)) {
            switch (region) {
                case 'class':
                case 'module':
                case 'functions':
                case 'interface':
                case 'enumeration':
                case 'variable':
                case 'typedef':
                    addRegions(tline, region)
                    break;
                default:
            }
        }
    })
    console.log(`*** Writing External Module file for ${moduleName}`)
    FileOps.writeFile(mdout, `./markdown/${moduleName}-module.md`)
    //genFunctionView()
    //genEnumView()
}
/**
 * Not used -- remove
 * @return {[type]} [description]
 */
// function genFunctionView() {
//     Object.keys(functionObj).forEach((e) => {
//         genMemberview(e, functionObj[e], funcMthd_mdout, false, true)
//         console.log(`*** Writing Function file for ${e}`)
//         FileOps.writeFile(funcMthd_mdout, `./markdown/${anchor}/${Utils.trimGenerics(e)}.md`)
//         funcMthd_mdout = []
//     })
// }


function genEnumView(e='') {
    enumT.forEach((tline) => {
        tline = tline.trim()
        var key = tline[0] || '*'
        if (WRITE_BACK.includes(key)) {
            tline = tline.replace('%enumname%', e)
            tline = tline.replace('%description%', enumObj[e]['descr'])
            enum_mdout.push(tline)
        } else if (TAKE_REPEAT_ACTION.includes(key)) {
            enumObj[e]['values'].forEach( (a) => {
                var mline = dclone(tline).substr(1)
                if (a[1]) {
                    mline = mline.replace('%value%', `:=${a[1]}`)
                }
                else {
                    mline = mline.replace('%value%', '')

                }
                mline = mline.replace('%member%', a[0])
                mline = mline.replace('%description%', a[2])
                enum_mdout.push(mline)
            })
        }
    })
    console.log(`*** Writing Enum file for ${e}`)
    FileOps.writeFile(enum_mdout, `./markdown/${anchor}/${Utils.trimGenerics(e)}.md`)
    enum_mdout = []
    return
}
/**
* START OF THE PROGRAM
*
*
*/
console.log('** Starting Program...')
FileOps.removeFolderRec('./markdown')
console.log('** Removed existing markdown files...')
FileOps.createFolder('./markdown')
console.log('** Output setup done')

try {
    moduleT = FileOps.loadFile('./config/module.md')
    classInterfaceT = FileOps.loadFile('./config/class_interface.md')
    methodfuncT = FileOps.loadFile('./config/method_function.md')
    enumT = FileOps.loadFile('./config/enum.md')
    allTypes = JSON.parse(FileOps.loadJson('./types/allTypes.json'))
    allMembers = JSON.parse(FileOps.loadJson('./types/allMembers.json'))
    console.log('** Config and type files read')
} catch (e) {
    console.log(`Error Loading config files.`)
    throw e
} finally {

}

let inputFiles = FileOps.walkFiles('./input', '.json')
inputFiles.forEach((e) => {
    console.log('** Processing: ' + e);
    let files = FileOps.walkFiles('./json', e.replace('.json',''))
    console.log(files);
    loadModule(files)
    moduleName = e.split('.')[0]
    genExtModuleView()
    file_reset()
})

function loadModule(files = []) {
    files.forEach((e) => {
        anchor = e.split('_')[0].toLowerCase()
        console.log('*** Processing: ' + anchor);

        FileOps.createFolder(`./markdown/${anchor}`)

        if (e.includes('_module.json')) {
            moduleObj = JSON.parse(FileOps.loadJson(`./json/${e}`))
            console.log(`*** Read Module JSON file, ${Object.keys(moduleObj)}`)
        } else if (e.includes('_class.json')) {
            classObj = JSON.parse(FileOps.loadJson(`./json/${e}`))
            console.log(`*** Read Class JSON file, ${Object.keys(classObj)}`)
        } else if (e.includes('_interface.json')) {
            iObj = JSON.parse(FileOps.loadJson(`./json/${e}`))
            console.log(`*** Read Interface JSON file, ${Object.keys(iObj)}`)
        } else if (e.includes('_enum.json')) {
            enumObj = JSON.parse(FileOps.loadJson(`./json/${e}`))
            console.log(`*** Read Enum JSON file, ${Object.keys(enumObj)}`)
        } else if (e.includes('_function.json')) {
            functionObj = JSON.parse(FileOps.loadJson(`./json/${e}`))
            console.log(`*** Read Function JSON file, ${Object.keys(functionObj)}`)
        } else if (e.includes('_variable.json')) {
            variableObj = JSON.parse(FileOps.loadJson(`./json/${e}`))
            console.log(`*** Read Variable JSON file, ${Object.keys(variableObj)}`)
        } else if (e.includes('_type.json')) {
            typeObj = JSON.parse(FileOps.loadJson(`./json/${e}`))
            console.log(`*** Read Typedef JSON file, ${Object.keys(typeObj)}`)
        }
        else {
            throw "Unrecognized file in inut JSON folder. Should be *_{module|class|enum|type|variable|function|interface).json"
        }
        })
        //
        //  console.log(`interface = ${nInterface}, class = ${nClass}, function = ${nFunction}, enum = ${nEnum}`);
        //          file_reset()
}
