/* eslint-disable prettier/prettier */
'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the ${chalk.red('Vchat Chat Bot')} generator!`)
    );

    this.answers =  await this.prompt([
      {
        type: 'input',
        name: 'chatbotName',
        message: 'What would you like to call your chat bot?',
        default: this.appname
      }
    ]);

    this.log(
      yosay(`Your chatbot is called ${chalk.green(this.answers.chatbotName)}`)
    )

  }

  writing() {
    const { chatbotName } = this.answers

    this.fs.copy(
      this.templatePath('frontend'),
      this.destinationPath('frontend')
    );

    this.fs.copyTpl(
      this.templatePath('vchat-serverless-backend'),
      this.destinationPath(`${ chatbotName }-serverless-backend`)
    );

    this.fs.copyTpl(
      this.templatePath('vchat-voxa'),
      this.destinationPath(`${ chatbotName }-voxa`)
    );
  }

  install() {
    const npmdir = process.cwd() + '/frontend';
    process.chdir(npmdir);
    this.installDependencies({ bower: false, npm: true})
  }

  installBackendDependencies() {
    const { chatbotName } = this.answers
    const npmdir = process.cwd() + `/${ chatbotName }-serverless-backend`;
    process.chdir(npmdir);
    this.installDependencies({ bower: false, npm: true})
  }

  installVoxaDependencies() {
    const { chatbotName } = this.answers
    const npmdir = process.cwd() + `/${ chatbotName }-voxa`;
    process.chdir(npmdir);
    this.installDependencies({ bower: false, npm: true})
  }
};
