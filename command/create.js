const fs = require('fs')
const { exec } = require("child_process");
const inquirer = require('inquirer')
const { download } = require('obtain-git-repo')
const { createSpinner } = require('nanospinner')
const chalk = require('chalk')

function create(projectName) {
  //询问用户
  inquirer.prompt(
    [
      {
        name: 'dirname',
        type: 'input',  // input、number、confirm、list、rawlist、expand、checkbox、password、editor
        message: '请输入目录名?', // 问题描述
        // choices: ['aui', 'a-ui'], // 问题选项 type为"list"生效
        // filter(val) {}, // 回答的过滤器
        // validate(answer) {},  // 回答的校验器
        default() {
          return 'aui'
        }
      }
    ]
  ).then((result) => {
    //目录是否已经存在
    const dirIsExists = fs.existsSync(result.dirname)

    if (dirIsExists) {
      console.log(chalk.redBright('目录已经存在'))
    } else {
      //显示下载动画
      const spinner = createSpinner('开始下载...').start()

      //下载git代码
      // download('direct:git@github.com:fengfeng34qy/aui.git', result.dirname, { clone: true }, function (err) {
      //   if (err) {
      //     console.log(err)
      //     spinner.error({ text: '下载失败' })
      //   } else {
      //     spinner.success({
      //       text: '项目创建成功，请依次执行以下命令',
      //     })
      //     console.log(chalk.white(`cd ${result.dirname || 'aui'}`))
      //     console.log(chalk.white('npm install'))
      //     console.log(chalk.white('npm run dev'))
      //     return
      //   }
      // })

      //下载git代码
      exec(`git clone git@github.com:fengfeng34qy/aui.git ${result.dirname}`, (error, stdout, stderr) => {
        if (error) {
          console.log(error);
          spinner.error({ text: '下载失败' })
        }
        spinner.success({
          text: '项目创建成功，请依次执行以下命令',
        })
        console.log(chalk.white(`cd ${result.dirname}`))
        console.log(chalk.white('npm install'))
        console.log(chalk.white('npm run dev'))
      });
    }
  }).catch(error => {
    console.log(error);
  })
  
}

module.exports = create;
