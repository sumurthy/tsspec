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

var self = module.exports = {
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
     * Takes a string and returns last 5 bytes of SHA-256. Replaces special character with 9
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    sha256: (data)  => {
        var random = crypto.createHash("sha256").update(data).digest("base64")
        random = random.slice(-5).replace(/\W+/g, '9')
        return random
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

    readCommentAhead: (lines = [], descr = '', current = 0) => {
        let o = {}
        o['descr'] = descr
        o['skip'] = []

        for (var i = (current + 1); i < lines.length; i++) {
            let line = lines[i]
            line = line.replace(/\s+/g, ' ').trim()
            let fw = line.split(' ', 1)[0]
            let sw = line.split(' ', 2)[1]
            if (fw === '*/' || (sw !== undefined && sw.startsWith('@'))) {
                return o
            } else {
                o['skip'].push(i)
                o['descr'] = o['descr'] + ' \n' + line.substr(2)
            }
        }
        return o
    },

    unWrapStatement: (lines = [], current = 0) => {
        let o = {}
        o['skip'] = []
        o['line'] = self.compact(lines[current])
        for (var i = (current + 1); i < lines.length; i++) {
            let line = lines[i].split('//')[0].trimRight()
            o['line'] = o['line'] + self.compact(line).trim()
            o['skip'].push(i)
            if (STATEMENT_END.includes(line.slice(-1))) {
                return o
            }
        }
        return o
    },
    compact: (line='') => {
        var firstWord = line.trim().split(' ', 1)[0]
        if (!SKIP.includes(firstWord)) {
            line = line.split('//')[0].trimRight()
        }
        line = line.replace(/\s+</g,'<') //Replace space+< to just <.
        line = line.replace(/<\s+/g,'<') //Replace space+< to just <.
        line = line.replace(/\s+>/g,'>') //Replace space+< to just <.
        line = line.replace(/\s+:/g,':') //Replace space+: to just : (helps with funcion detection).
        line = line.replace(/\s+\?/g,'?') //Replace space+: to just : (helps with funcion detection).
        return line
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
    getMethodName: (line = '', withOptional = false) => {
        var name = line.split('(')[0]  //take left of '(' character
        name = self.stripQualifier(name)
        if (!withOptional) name = name.replace('?', '')
        name = name.replace(':', '')
        name = name.replace(/\s+/g, '') //remove spaces
        if (name.startsWith('new')) {
            name = name.replace('new', 'constructor')
        }
        //name = name + '~' + (Math.floor(Math.random() * 90000) + 10000)
        if (!withOptional) {
            name = name + '-' + self.sha256(line)
            return name
        } else {
            return name
        }

    },

    cleanupName: (name = '', removeOptional = true) => {
        if (removeOptional) {
            return name.split(':')[0].split('=')[0].replace('?', '').trim()
        } else {
            return name.split(':')[0].split('=')[0].trim()
        }
    },

    getPropName: (line = '', removeOptional = true) => {

        var o = self.cleanupName(self.stripQualifier(line), removeOptional)
        if (removeOptional) {
            return o.replace('?','')
        } else {
            return o
        }

    },

    readObjectAhead: (lines = [], current = 0) => {
        let o = {}
        o['obj'] = {}
        o['skip'] = []

        for (var i = current; i < lines.length; i++) {
            var line = lines[i]
            o['skip'].push(i)
            if (line.includes(BLOCK_END)) {
                return o
            }
        }
        return o
    },
    getAccessModifier: (line = '') => {
        var am = 'public'
        if (line.includes('private ')) am = 'private'
        if (line.includes('protected ')) am = 'protected'
        return am
    },
    getSignature: (line = '') => {
        line = self.stripQualifier(line)
        return line

    },
    processMethod: (method={}, name="") => {
        var m = {}
        m['descr'] = ''
        if (method['summary'].length > 0) {
            m['descr'] = method['summary'][0]['value']
        }
        m['accessModifier'] = method['accessModifier']
        m['signature'] = method['signature']
        m['isStatic'] = method['isStatic']
        m['isOptional'] = method['isOptional']
        m['genericType'] = null
        m['returnType'] = method['returnType']['type']
        m['returnDescr'] = ""
        if (method['returnType']['description'].length > 0) {
            m['returnDescr'] = method['returnType']['description'][0]['value']
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

    processProperty: (property={}, name="") => {
        var p = {}
        p['descr'] = ''
        if (property['summary'].length > 0) {
            p['descr'] = property['summary'][0]['value']
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
    createClassInterfaceObject: (line='', descr = '', isClass=true) => {
        var o = {}
        var extendsImplementsName = ''
        if (line.includes(EXTENDS)) {
            var extendsName = line.split('extends ')[1]
            extendsImplementsName = extendsName.split(BLOCK_BEGIN)[0].trim()
        } else if (line.includes(IMPLEMENTS)) {
            extendsImplementsName = line.split('implements ')[1].split(BLOCK_BEGIN)[0].trim()
        }
        if (isClass) {
        o['implementsExtendsName'] = extendsImplementsName
            var rawGenericsInside = line.split(' ')[2]
        }else {
            var rawGenericsInside = line.split(' ')[2]
        }
        o['genericType'] = self.genericInside(rawGenericsInside)
        o['descr'] = descr
        o['properties'] = {}
        o['functions'] = {}
        o['methods'] = {}
        o['constructor'] = {}
        o['types'] = {}
        o['variables'] = {}
        o['modules'] = {}
        o['objects'] = {}
        return o
    },
    getMemberType: (line = '', isClass = true) => {
        let firstWord = line.split(' ', 1)[0]
        let secondWord = line.split(' ', 2)[1]
        var type = ''
        if (line.includes(BLOCK_BEGIN) && !line.includes(BLOCK_END)) {
            type = 'OBJECT'
        } else if (line.includes(FUNCTION)) {
            type = 'FUNCTION'
        } else if (firstWord.startsWith('constructor') || secondWord.startsWith('constructor')) {
            type = 'METHOD'
        } else if (line.includes(VARIABLEDEF) || (firstWord === 'var')) {
            type = 'VARIABLE'
        } else if (line.includes(TYPEDEF)) {
            type = 'TYPE'
        } else if (line.includes(MODULEDEF)) {
            type = 'MODULE'
        } else {
            //line = self.stripQualifier(line)
            var colon = line.indexOf(':')
            var paren = line.indexOf('(')
            if (paren == -1 && colon == -1) {
                type == 'UNDEFINED'
            } else if (colon == -1 && paren > 0) {
                type = 'METHOD'
            } else if (paren == -1 && colon > 0) {
                type = 'PROPERTY'
            } else if (colon < paren) {
                type = 'PROPERTY'
            } else if (colon > paren) {
                type = 'METHOD'
            }
        }
        return type
    },
    stripQualifier: (line='') => {
        line = line.replace('public ', '')
        line = line.replace('function ', '')
        line = line.replace('private ', '')
        line = line.replace('protected ', '')
        line = line.replace('static ', '')
        line = line.replace('export ', '')
        line = line.replace('var ', '')
        return line
    },
    splitToWords: (line='') => {
        var o = {}
        var firstWord = line.split(' ', 1)[0]
        var secondWord = line.split(' ', 2)[1]
        secondWord = secondWord || 'OBJECTERROR'

        if ((firstWord === 'new') || (firstWord.startsWith('new'))) {
            firstWord = self.getMethodName(line)
        }

        var thirdWord = line.split(' ', 3)[2]
        var lastWord = line.split(':').pop()
        o['f'] = firstWord
        o['s'] = secondWord
        o['t'] = thirdWord
        o['l'] = lastWord
        return o
    }
}
