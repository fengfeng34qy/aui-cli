const { exec } = require("child_process");

function createAction(name) {
  // 这是模板项目的仓库地址
  const url = "https://github.com/fengfeng34qy/aui";
  // 克隆项目
  exec(`git clone ${url} ${name}`, (error, stdout, stderr) => {
    if (error) {
      console.log(error);
      process.exit();
    }
    console.log("Success");
    process.exit();
  });
}

const create = {
  alias: 'c',
  params: '<project-name>',
  description: 'create a new project',
  action: createAction,
}

module.exports = create;