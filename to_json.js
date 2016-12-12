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
let moduleObj = {}
let methodObj = {}
let propObj = {}
let typeObj = {}
let variableObj = {}
let generalDesc = ''
let commentParent = {
    'param': []
}
let commentObject = JSON.parse(JSON.stringify(commentParent))
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
    moduleObj = {}
    functionObj = {}
    iObj = {}
    propObj = {}
    typeObj = {}
    variableObj = {}
    interfaceName = ''
    methodObj = {}
    propObj = {}
    generalDesc = ''
    //commentObject = JSON.parse(JSON.stringify(commentParent))
    commentObject['param'] = []
    commentObject['returnDescr'] = ''
    commentObject['generalDescr'] = ''
    comment_reset()
}

function block_end_reset() {
    methodObj = {}
    propObj = {}
    generalDesc = ''
    commentObject['param'] = []
    commentObject['returnDescr'] = ''
    commentObject['generalDescr'] = ''
    interfaceName = ''
    comment_reset()
}

function block_begin_reset() {
    generalDesc = ''
    paramEncountered = false
    readonlyProperty = false
}

function comment_reset() {
    block_begin_reset()
    commentObject['param'] = []
    commentObject['returnDescr'] = ''
}

function processClassInterface(obj={}, objName= '', fileName='') {
    console.log("processClassInterface");
    let o = {}
    o['implementsExtendsName'] = ''
    if (obj['implements']) {
        o['implementsExtendsName'] = obj['implements']
    }

    o['genericType'] = ""
    if (obj['typeParameters']) {
        o['genericType'] = obj['typeParameters'].join(', ')
    }
    o['descr'] = obj['summary'][0]['value']
    o['properties'] = {}
    o['functions'] = {}
    o['methods'] = {}
    o['constructor'] = {}
    o['types'] = {}
    o['variables'] = {}
    o['modules'] = {}
    o['objects'] = {}

    Object.keys(obj['members']).forEach((e) => {
        console.log('==>' + e);
        switch (obj['members'][e]['kind']) {
            case 'property':
                var p = Utils.processProperty(obj['members'][e], e)
                o['properties'][e] = p
                break;
            case 'method':
                // Write to all members
                allMembers[`${objName}.${e.toLowerCase().replace(/_/g,'')}`] = '../' + fileName + '/' + objName + '#' + e.toLowerCase().replace(/_/g,'')
                var m = Utils.processMethod(obj['members'][e], e)
                if (e === '__constructor') {
                    o['constructor'] = m
                }
                else {
                    o['methods'][e] = m
                }
                // Add to all-members
                break;
            default:
        }
    })
    return o
}

function processEnum(obj={}, objName='', fileName='') {
    console.log("processEnum");
    let o = Utils.processEnum(obj)
    return o
}

/**
 * STARTING: Load input files and process each file and each line within.
 */
console.log('** Starting Program...')
SetUp.cleanupOutput('./json')
SetUp.cleanupOutput('./types')

let inputFiles = FileOps.walkFiles('./input', '.json')
inputFiles.forEach((e) => {
    console.log('** Processing: ' + e);
    let fileObj = JSON.parse(FileOps.loadJson(`./input/${e}`))
    console.log(Object.keys(fileObj['exports']));
    processModule(fileObj['exports'], e.split('.json')[0])
    file_reset()
})
FileOps.writeObject(allTypes, `./types/allTypes.json`)
FileOps.writeObject(allMembers, `./types/allMembers.json`)

/**
 * End program
 */

function processModule(packageObj={}, fileName="error") {
    Object.keys(packageObj).forEach((e) => {
        console.log("Processing: " + e + " " + packageObj[e]['kind']);
        allTypes[e] = '../' + fileName.toLowerCase() + '/' + e.toLowerCase() + '.md'

        switch (packageObj[e]['kind']) {
            case 'class':
                classObj[e] = processClassInterface(packageObj[e], e.toLowerCase(), fileName.toLowerCase())
                break;
            case 'interface':
                iObj[e] = processClassInterface(packageObj[e], e.toLowerCase(), fileName.toLowerCase())
                break;
            case 'enum':
                console.log('-----------------');
                enumObj[e] = processEnum(packageObj[e])
                break;
            default:

        }
    })

    FileOps.writeObject(enumObj, `./json/${fileName}_enum.json`)
    FileOps.writeObject(moduleObj, `./json/${fileName}_module.json`)
    FileOps.writeObject(functionObj, `./json/${fileName}_function.json`)
    FileOps.writeObject(iObj, `./json/${fileName}_interface.json`)
    FileOps.writeObject(classObj, `./json/${fileName}_class.json`)
    FileOps.writeObject(typeObj, `./json/${fileName}_type.json`)
    FileOps.writeObject(variableObj, `./json/${fileName}_variable.json`)

    console.log(`*** module = ${nModule}, interface = ${nInterface}, class = ${nClass}, function = ${nFunction}, enum = ${nEnum}, variable = ${nVariable}, type = ${nType}`);
    file_reset()
}
