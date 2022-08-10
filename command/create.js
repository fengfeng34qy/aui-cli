// const inquirer = require("inquirer");
import inquirer from 'inquirer'
// const chalk = require("chalk");
// import chalk from 'chalk';
const { exec } = require("child_process");

function createAction(name) {
  // 这是模板项目的仓库地址
  // const url = "https://github.com/fengfeng34qy/aui";
  // // 克隆项目
  // exec(`git clone ${url} ${name}`, (error, stdout, stderr) => {
  //   if (error) {
  //     console.log(error);
  //     process.exit();
  //   }
  //   console.log("Success");
  //   process.exit();
  // });
  // console.log('-----------')
  // inquirer.prompt({
  //   type: "input",
  //   message: "项目名称:",
  //   name: "projectName",
  //   validate: (val) => {
  //     // 对输入的值做判断
  //     if (!val || !val.trim()) {
  //       return chalk.red("项目名不能为空，请重新输入");
  //     } else if (val.includes(" ")) {
  //       return chalk.red("项目名不能包含空格，请重新输入");
  //     }
  //     return true;
  //   }
  // })
}

const create = {
  alias: 'c',
  params: '<project-name>',
  description: 'create a new project',
  action: createAction,
}

module.exports = create;