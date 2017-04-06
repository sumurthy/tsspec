import FileOps from './modules/fileops'


let functionObj = {}
let iObj = {}
let classObj = {}
let moduleObj = {}
let enumObj = {}
let variableObj = {}
let typeObj = {}

let moduleName = ''
let objectName = ''
let interfaceName = ''


let anchor = ''
let tocFile = []
let tocBottom = []

let item1 = "<Item text=\""
let item2 = "\" url=\"spdx/"
let item3 = "\" SEODescription=\"\">"
let item3End = "\" SEODescription=\"\"/>"
let item4 = "url=\"spdx/"
let itemEnd = "</Item>"
let fileEnd = "</Item></Menu>"


function addItemLine(name="", type="", path="", endSegment=true) {

    var line = item1 + name + type + item2 + path.toLowerCase()
    if (endSegment) {
        line = line + item3End
    }
    else {
        line = line + item3
    }
    tocFile.push(line)
}

function endSegment() {
    tocFile.push(itemEnd)
}

function fileSegment() {
    tocFile.push(fileEnd)
}
/**
* START OF THE PROGRAM
*/

try {
    tocFile = FileOps.loadFile('./config/toc_top.xml')
    console.log('* XML template files read')
} catch (e) {
    console.log(`Error Loading config files.`)
    throw e
} finally {

}

// let inputFiles = FileOps.walkFiles('./input', '.json')

// let inputFiles = ['sp-webpart-base.json',
//                 'sp-core-library.json',
//                 'sp-component-base.json',
//                 'sp-http.json'
//                 ,'sp-loader.json',
//                 ,'sp-odata-types.json',
//                 ,'sp-page-context.json'
//                 ]

let inputFiles = ['sp-application-base.api.json',
                'sp-loader.api.json',
                'sp-odata-types.api.json',
                'sp-page-context.api.json',
                'sp-core-library.api.json',
                'sp-component-base.api.json',
                'sp-listview-extensibility.api.json',
                'sp-http.api.json',
                'sp-webpart-base.api.json',
                'sp-extension-base.api.json'
                ]

let inputFilesExternal = ['es6-collections.api.json',
                    'es6-promise.api.json',
                    'whatwg-fetch.api.json'
                ]


inputFilesExternal.forEach((e) => {
// inputFiles.forEach((e) => {
    console.log('** Processing: ' + e);
    let files = FileOps.walkFiles('./json', e.replace('.json',''))
    moduleName = e.split('.')[0]
    addItemLine(moduleName, "", `${moduleName}-module`, false)
    loadModule(files, moduleName)
    endSegment()

})
fileSegment()
console.log(`*** Writing TOC file`)
FileOps.writeFile(tocFile, `./toc/toc.xml`)


function loadModule(files = [], moduleName = "") {
    files.forEach((e) => {
        anchor = e.split('_')[0].toLowerCase()
        FileOps.createFolder(`./markdown/${anchor}`)

        if (e.includes('_module.json')) {
            moduleObj = JSON.parse(FileOps.loadJson(`./json/${e}`))
            if (Object.keys(moduleObj).length > 0) {
                // Add grouping line
                addItemLine('', "Modules", `${moduleName}`, false)
                Object.keys(moduleObj).forEach((e) => {
                    addItemLine(e, "", `${anchor}/module/${e}`, true)
                })
                endSegment()

            }
        } else if (e.includes('_class.json')) {
            classObj = JSON.parse(FileOps.loadJson(`./json/${e}`))
            if (Object.keys(classObj).length > 0) {
                // Add grouping line
                addItemLine('', "Classes", `${moduleName}`, false)
                Object.keys(classObj).forEach((e) => {
                    addItemLine(e, "", `${anchor}/class/${e}`, true)
                })
                endSegment()

            }
        } else if (e.includes('_interface.json')) {
            iObj = JSON.parse(FileOps.loadJson(`./json/${e}`))
            if (Object.keys(iObj).length > 0) {
                // Add grouping line
                addItemLine('', "Interfaces", `${moduleName}`, false)
                Object.keys(iObj).forEach((e) => {
                    addItemLine(e, "", `${anchor}/interface/${e}`, true)
                })
                endSegment()

            }
        } else if (e.includes('_enum.json')) {
            enumObj = JSON.parse(FileOps.loadJson(`./json/${e}`))
            if (Object.keys(enumObj).length > 0) {
                // Add grouping line
                addItemLine('', "Enumerations", `${moduleName}`, false)
                Object.keys(enumObj).forEach((e) => {
                    addItemLine(e, "", `${anchor}/enum/${e}`, true)
                })
                endSegment()

            }
        } else if (e.includes('_function.json')) {
            functionObj = JSON.parse(FileOps.loadJson(`./json/${e}`))
            if (Object.keys(functionObj).length > 0) {
                // Add grouping line
                addItemLine('', "Functions", `${moduleName}`, false)
                Object.keys(functionObj).forEach((e) => {
                    addItemLine(e, "", `${anchor}/function/${e}`, true)
                })
                endSegment()

            }
        } else if (e.includes('_variable.json')) {
            variableObj = JSON.parse(FileOps.loadJson(`./json/${e}`))
            if (Object.keys(variableObj).length > 0) {
                // Add grouping line
                addItemLine('', "Variables", `${moduleName}`, false)
                Object.keys(variableObj).forEach((e) => {
                    addItemLine(e, "", `${anchor}/variable/${e}`, true)
                })
                endSegment()

            }
        } else if (e.includes('_type.json')) {
            typeObj = JSON.parse(FileOps.loadJson(`./json/${e}`))
            if (Object.keys(typeObj).length > 0) {
                // Add grouping line
                addItemLine('', "Types", `${moduleName}`, false)
                Object.keys(typeObj).forEach((e) => {
                    addItemLine(e, "", `${anchor}/type/${e}`, true)
                })
                endSegment()

            }
        }
        else {
            throw "Unrecognized file in inut JSON folder. Should be *_{module|class|enum|type|variable|function|interface).json"
        }
        })
        //
        //  console.log(`interface = ${nInterface}, class = ${nClass}, function = ${nFunction}, enum = ${nEnum}`);
        //          file_reset()
}
