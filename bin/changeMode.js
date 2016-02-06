#!/usr/bin/env node

'use strict';

const fs = require('fs')
const path = require('path')
const fileName = path.resolve(process.cwd(), 'js/config.js')
const originaleConfig = fs.readFileSync(fileName, 'utf8')
const config = /mode:\s?'(\w+)',/.exec(originaleConfig)

if(config === null)
    process.abort()

console.log('CMS.js is configured to %s mode', config[1])

const newMode = config[1] === 'Github' ? 'Server' : 'Github'

console.log('Changing to %s mode...', newMode)

fs.writeFileSync(fileName, originaleConfig.replace(config[0], `mode: '${newMode}',`), 'utf8')
