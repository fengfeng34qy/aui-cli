const fs = require('fs')
const { exec } = require("child_process");
const inquirer = require('inquirer')
const { download } = require('obtain-git-repo')
const { createSpinner } = require('nanospinner')
const chalk = require('chalk')
const axios = require('axios');

const rq = axios.create({
  baseURL: 'https://docs.sunfengfeng.com',
  timeout: 10000,
  headers: { // 请求头设置，（微信云开发数据APi采用application/json格式入参，否则导致47001错误）
    "Content-Type":"application/json; charset=utf-8"
  }
})
// axios 请求头拦截器
// rq.interceptors.request.use(req => {
//     // 有需要的，在此处拦截请求入参进行处理
//     return req
// },error => {
//     return Promise.reject(error)
// })

// axios 返回信息拦截器
// rq.interceptors.response.use(res => {
//     return res.data
// },error => {
//     return Promise.reject(error)
// })
function sleepAsync(t) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, t)
  })
}

function getGitUrl(dirname) {
  for (let i = 0; i < projectList.length; i++) {
    if (projectList[i].value === dirname) {
      return projectList[i].url;
    }
  }
  return false;
}

let projectList = [];


async function create(projectName) {
  const getListSpinner = createSpinner('正在获取项目列表...').start()
  // await sleepAsync(2000);
  // getListSpinner.stop()
  rq({
    url: '/rq/f-cli',
    method: 'post',
    data: {
      service_code: 'FC01'
    }
  }).then(function(response) {
    getListSpinner.stop();
    console.log(response.data.data)
    let list = response.data.data;
    for (let i = 0; i < list.length; i++) {
      var obj = {}
      obj.name = list[i].name;
      obj.value = list[i].value;
      obj.url = list[i].url;
      projectList.push(obj);
    }
    //询问用户
    inquirer.prompt(
      [
        {
          name: 'dirname',
          type: 'list',  // input、number、confirm、list、rawlist、expand、checkbox、password、editor
          message: '请选择项目?', // 问题描述
          choices: projectList, // 问题选项 type为"list"生效
          // filter(val) {}, // 回答的过滤器
          // validate(answer) {},  // 回答的校验器
          default() {
            return 'aui'
          }
        }
      ]
    ).then((result) => {
      console.log(result);
      // 目录是否已经存在
      const dirIsExists = fs.existsSync(result.dirname)

      // 获取git地址
      let url = getGitUrl(result.dirname)

      if (!url) console.log(chalk.redBright('git地址未找到!'));

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
        exec(`git clone ${url} ${result.dirname}`, (error, stdout, stderr) => {
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
  }).catch (error => {
    console.log(error);
    getListSpinner.error({ text: '获取项目列表失败' });
  })
  
}

module.exports = create;
