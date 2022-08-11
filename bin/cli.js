#!/usr/bin/env node

/**
 * Aui
 * 前端脚手架
 * @author sunfengfeng <http://aui.sunfengfeng.com>
 */
const chalk = require('chalk')
const inquirer = require('inquirer')
const fs = require('fs')
const figlet = require('figlet')
const { Command } = require('commander')
const { name, version } = require('../package.json')
const Task = require('../command/index')

const program = new Command();

program.name(name).version(version);

figlet('welcome use aui', async function (err, data) {
  //打印文字图案
  console.log(data)

  program
  .command("create")
  .alias('c')
  .description("create a new project")
  .option('--first', 'display just the first substring')
  .action(async (name) => {
    await Task.createAsync(name);
  });
  
  program.parse();
})
