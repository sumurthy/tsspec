//import {loadFile, writeFile}  from './modules/fileops'
import FileOps from './modules/fileops'
import SetUp from './modules/setuproutine'
import Objects from './modules/objects'
import Utils from './modules/utils'

const SKIP = ['///', '//', '']
const C_START = '/**'
const COMMENT = '*'
const C_END = '*/'
const COMMENT_ALL = ['*', '//', '/**']
const BLOCK_BEGIN = '{'
const BLOCK_END = '}'
const IGNORES = ['@todo:']
const CLASSDEF = 'declare class'
const TYPEDEF = 'declare type'
const VARIABLEDEF = 'declare var'
const INTERFACEDEF = 'interface'
const MODULEDEF = 'declare module'
const ENUM = 'enum '
const FUNCTION = 'function '
const NEWLINE = '\n  '
const ATSYMBOL = '@'
const OBJECT_INSIDE  = /{(.*?)}/
const IMPLEMENTS = 'implements '
const EXTENDS = 'extends '

let anchor = ''
let ignore_lines = []
let ignore_upto = -1
let cBuffer = {}
let ignoreMode = false
let paramEncountered = false
let mode = ''
let cmode = false
let readonlyProperty = false
let saveFileName = ''
let nClass = 0
let nFunction = 0
let nEnum = 0
let nVariable = 0
let nType = 0
let nModule = 0
let nInterface = 0
let isStatic = false
let hasAssignment = false
let assignValue = null
let firstWord = ''
let secondWord = ''
let thirdWord = ''
let lastWord = ''
// GLOBAL - TYPES OF OBJECT
//
let allTypes = {}
let allMembers = {}
let enumObj = {}
let enumKey = ''
let className = ''
let classObj = {}
let iObj = {}
let interfaceName = ''
let moduleName = ''
let functionObj = {}
let packageObj = {}
let methodObj = {}
let propObj = {}
let typeObj = {}
let variableObj = {}
let generalDesc = ''
let commentParent = {
    'param': []
}
let commentObject = JSON.parse(JSON.stringify(commentParent))
let toc=[]



function file_reset() {
    nClass = 0
    nFunction = 0
    nEnum = 0
    nInterface = 0
    ignore_upto = 0
    nModule = 0
    nVariable = 0
    nType = 0
    mode = ''
    enumObj = {}
    enumKey = ''
    classObj = {}
    packageObj = {}
    functionObj = {}
    iObj = {}
    propObj = {}
    typeObj = {}
    variableObj = {}
    interfaceName = ''
    methodObj = {}
    propObj = {}

}


function processClassInterface(obj={}, objName= '', fileName='', objectType='') {

    let o = Utils.createClassInterfaceObject(obj)

    // Some interfaces don't have any members
    if (!obj['members']) {
        return o
    }

    Object.keys(obj['members']).forEach((e) => {
        switch (obj['members'][e]['kind']) {
            case 'property':
                var p = Utils.processProperty(obj['members'][e], e, obj['isBeta'])
                o['properties'][e] = p
                break;
            case 'method':
            case 'constructor':

                // Write to all members
                allMembers[`${objName}.${e.toLowerCase().replace(/_/g,'')}`] = '../../' + fileName + '/' + objectType +'/'+ objName + '#' + e.toLowerCase().replace(/_/g,'')
                var m = Utils.processMethod(obj['members'][e], e, obj['isBeta'])
                if (e === '__constructor') {
                    o['constructor'] = m
                }
                else {
                    o['methods'][e + '-'+ objName] = m
                }
                // Add to all-members
                break;
            default:
            console.log('ERROR: Unmatched sub-type: ' + obj['members'][e]['kind']);
            break;
        }
    })
    return o
}

function processEnum(obj={}, objName='', fileName='') {
    let o = Utils.processEnum(obj)
    return o
}

/**
 * STARTING: Load input files and process each file and each line within.
 */
console.log('* Starting Program...')
SetUp.cleanupOutput('./json')
SetUp.cleanupOutput('./types')
console.log('');
let inputFiles = FileOps.walkFiles('./input', '.json')
inputFiles.forEach((e) => {
    console.log('** Processing: ' + e);
    let fileObj = JSON.parse(FileOps.loadJson(`./input/${e}`))
    if (fileObj['summary'][0]) {
        packageObj['summary'] = fileObj['summary'][0]['value']
    }
    else {
        packageObj['summary'] = ''
    }

    if (fileObj['remarks'][0]) {
        packageObj['remarks'] = fileObj['remarks'][0]['value']
    }
    else {
        packageObj['remarks'] = ''
    }
    processModule(fileObj['exports'], e.split('.json')[0])
    file_reset()
})
FileOps.writeObject(allTypes, `./types/allTypes.json`)
FileOps.writeObject(allMembers, `./types/allMembers.json`)

/**
 * End program
 */

function processModule(packageContent={}, fileName="error") {
    toc.push(Utils.moduleTocEntry(fileName))

    Object.keys(packageContent).forEach((e) => {
        //console.log("**** Processing: " + e + " " + packageObj[e]['kind']);

        switch (packageContent[e]['kind']) {
            case 'class':
                classObj[e] = processClassInterface(packageContent[e], e.toLowerCase(), fileName.toLowerCase(), 'class')
                nClass++
                break;
            case 'interface':
                iObj[e] = processClassInterface(packageContent[e], e.toLowerCase(), fileName.toLowerCase(), 'interface')
                nInterface++
                break;
            case 'enum':
                enumObj[e] = processEnum(packageContent[e])
                nEnum++
                break;
            case 'function':
                functionObj[e] = Utils.processMethod(packageContent[e], e)
                nFunction++
                break;
            default:
                console.log('ERROR Unmatched type: ' + packageContent[e]['kind']);
                break;
        }
        allTypes[e] = '../../' + fileName.toLowerCase() + '/' + packageContent[e]['kind'] + '/' + e.toLowerCase() + '.md'

    })

    FileOps.writeObject(enumObj, `./json/${fileName}_enum.json`)
    FileOps.writeObject(packageObj, `./json/${fileName}_package.json`)
    FileOps.writeObject(functionObj, `./json/${fileName}_function.json`)
    FileOps.writeObject(iObj, `./json/${fileName}_interface.json`)
    FileOps.writeObject(classObj, `./json/${fileName}_class.json`)
    FileOps.writeObject(typeObj, `./json/${fileName}_type.json`)
    FileOps.writeObject(variableObj, `./json/${fileName}_variable.json`)

    console.log(`----> interface = ${nInterface}, class = ${nClass}, function = ${nFunction}, enum = ${nEnum}`);
    console.log('');
    file_reset()
}
