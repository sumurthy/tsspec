import * as crypto from 'crypto'

const BETWEEN_BRACKETS = /\(([^)]+)\)/;
const GENERIC_INSIDE = /\<([^)]+)\>/
const BLOCK_BEGIN = '{'
const BLOCK_END = '}'
const STATEMENT_END = [';', '{', '}']
const SKIP = ['*', '//', '/**', '///', '', '*/', '/*']
const TYPEDEF = 'declare type'
const VARIABLEDEF = 'declare var'
const MODULEDEF = 'module '
const FUNCTION = 'function '
const EXTENDS = 'extends '
const IMPLEMENTS = 'implements '
const BETA_MESSAGE = '<br/> _This API is provided as a preview for developers and may change based on feedback that we receive.  Do not use this API in a production environment._'

var self = module.exports = {

    /**
     * Takes a string and returns last 5 bytes of SHA-256. Replaces special character with 9
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    sha256: (data)  => {
        var random = crypto.createHash("sha256").update(data).digest("base64")
        random = random.slice(-5).replace(/\W+/g, '9')
        return random
    },
    moduleTocEntry: (moduleName='') => {
        return `<Item text="${moduleName}" url="spdx/${moduleName}" SEODescription=""> \n`
    },
    classTocEntry: (moduleName='', className='') => {
        return `<Item text="${className}" url="spdx/${moduleName}/${className}" SEODescription=""/> \n`
    },
    genericInside: (str = '') => {
        //var g = GENERIC_INSIDE.exec(str)
        var g = self.inParen(str, true)
        if (g) {
            return g.trim()
        } else {
            return null
        }
    },

    trimGenerics: (str = '', replaceSb=false) => {
        var n = str.split('<')[0]
        if (n) {
            n = n.trim()
        }
        if (replaceSb) {
            return n.replace('[]','')
        } else {
            return n
        }
    },
    /**
     * Retuns what's inside (parenthesis) or <generictype>. This is better than generics.
     * @param  {String}  [line='']         [description]
     * @param  {Boolean} [isGeneric=false] [description]
     * @return {[type]}                    [description]
     */
    inParen: (line='', isGeneric = false) => {
        var out = null
        if (!isGeneric) {
            var start = line.indexOf('(')
            var end = line.lastIndexOf(')')
        } else {
            var start = line.indexOf('<')
            var end = line.lastIndexOf('>')
        }

        if ((start === -1) || (end === -1)) {
            return out
        }
        else {
            var length = end - start -1
            out = line.substr(start+1, length)
            return out
        }
    },
    /**
     * While splitting parameter list, we need to supress/replace commas within the param list to
     * ensure it doesn't get picked up as a parameter.
     * @param  {String} [line=''] [description]
     * @return {[type]}           [description]
     */
    replaceCommaInGenerics: (line='') => {
        var openBrace = false
        var openBracket = false
        var replaced = false
        var out = []
        for (var i = 0, len = line.length; i < len; i++) {
            if (line[i] === '<') openBracket = true
            if (line[i] === '>') openBracket = false
            if (line[i] === '(') openBrace = true
            if (line[i] === ')') openBrace = false
            if ((openBrace || openBracket) && line[i] === ',') {
                out[i] = '^'
                replaced = true
            } else {
                out[i] = line[i]
            }
        }
        return out.join('')
    },
    /**
     * Build param list
     * @param  {String} [line='']         [description]
     * @param  {Array}  [paramComment=[]] [description]
     * @return {[type]}                   [description]
     */

    getParamList: (param={}) => {
        var out = []
        Object.keys(param).forEach((e) => {
            var fp = {}
            fp['name'] = param[e]['name']
            if (param[e]['isSpread']){
                fp['name'] = '...' + fp['name']
            }
            fp['descr'] = ''
            if (param[e]['description'].length > 0) {
                fp['descr'] = param[e]['description'][0]['value']
            }
            fp['isOptional'] = param[e]['isOptional']
            fp['dataType'] = param[e]['type']
            if (!fp['dataType']) {
                fp['dataType'] = null
            }
            out.push(fp)
        })
        return out
    },

    /**
     * Append a 5 character string at the end.
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    appendRandom: (name) => {
        return (name + '-' + self.sha256(name))
    },

    getAccessModifier: (line = '') => {
        var am = 'public'
        if (line.includes('private ')) am = 'private'
        if (line.includes('protected ')) am = 'protected'
        return am
    },
    processMethod: (method={}, name="", isClassBeta=false) => {
        var m = {}
        m['isBeta'] = false
        m['showBetaMessage'] = false
        // Set member showBetaMessage flag to true when either class/interface is in beta or indovodual method is in beta.
        if (method['isBeta'] || isClassBeta) {
            m['showBetaMessage'] = true
        }
        if (method['isBeta']) {
            m['isBeta'] = method['isBeta']
        }

        m['descr'] = ''
        if (method['summary'].length > 0) {
            m['descr'] = method['summary'][0]['value']
        }
        m['remarks'] = null
        if (method['remarks'].length > 0) {
            m['remarks'] = method['remarks'][0]['value']
        }
        m['accessModifier'] = method['accessModifier']
        m['signature'] = method['signature']
        m['isStatic'] = method['isStatic']
        m['isOptional'] = method['isOptional']
        m['genericType'] = null
        if (method['returnValue']) {
            m['returnType'] = method['returnValue']['type']
        }
        else {
            m['returnType'] = ''
        }
        m['returnDescr'] = ""
        if (method['returnValue'] && method['returnValue']['description'].length > 0) {
            m['returnDescr'] = method['returnValue']['description'][0]['value']
        }

        m['params'] = self.getParamList(method['parameters'])

        var list = ''
        m['params'].forEach((e) => {
            list = list + e['name'] + ','
        })
        if (list) list = list.slice(0,-1)
        name = name.replace(/_/g,'')
        m['docName'] = name.split('-')[0] + '(' + list + ')'
        // Create markdown in-line page link. Makes it easy to display...
        m['mdLink'] = m['docName'].toLowerCase().replace(/,|\(|\)/g,'') //.replace(/\s+/,'-')
        return m
    },

    processProperty: (property={}, name="", isObjBeta=false) => {
        var p = {}
        p['descr'] = ''
        if (property['summary'].length > 0) {
            p['descr'] = property['summary'][0]['value']
        }
        if (property['isBeta'] && !isObjBeta) {
            p['descr'] = p['descr'] + BETA_MESSAGE
        }
        p['remarks'] = null
        if (property['remarks'].length > 0) {
            p['remarks'] = property['remarks'][0]['value']
        }

        p['dataType'] = property['type']
        p['isOptional'] = property['isOptional']
        p['readonly'] = property['isReadOnly']
        p['accessModifier'] = self.getAccessModifier('')
        p['isCollection'] = false
        p['function'] = null
        p['returnType'] = null
        p['assignValue'] = null
        return p
    },

    processEnum: (enumObj={}, name="") => {
        var en = {}
        en['descr'] = ''
        if (enumObj['summary'].length > 0) {
            en['descr'] = enumObj['summary'][0]['value']
        }
        en['values'] = []
        Object.keys(enumObj['values']).forEach((e) => {
            var item = []
            item[0] = e
            item[1] = enumObj['values'][e]['value']
            item[2] = ''
            if (enumObj['values'][e]['summary'].length > 0) {
                item[2] = enumObj['values'][e]['summary'][0]['value']
            }
            en['values'].push(item)
        })

        return en
    },

    createModuleObject: (descr = '') => {
        var o = {}
        o['variable'] = {}
        o['function'] = {}
        o['module'] = {}
        return o
    },

    createClassInterfaceObject: (obj={}) => {
        var o = {}
        o['isBeta'] = false
        if (obj['isBeta']) {
            o['isBeta'] = obj['isBeta']
        }
        o['implementsExtendsName'] = ''
        if (obj['implements']) {
            o['implementsExtendsName'] = obj['implements']
        }

        o['genericType'] = ""
        if (obj['typeParameters']) {
            o['genericType'] = obj['typeParameters'].join(', ')
        }
        o['descr'] = ''
        if (obj['summary'].length > 0) {
            o['descr'] = obj['summary'][0]['value']
        }
        o['remarks'] = null
        if (obj['remarks'].length > 0) {
            o['remarks'] = obj['remarks'][0]['value']
        }
        o['properties'] = {}
        o['functions'] = {}
        o['methods'] = {}
        o['constructor'] = {}
        o['types'] = {}
        o['variables'] = {}
        o['modules'] = {}
        o['objects'] = {}
        return o
    }
}
