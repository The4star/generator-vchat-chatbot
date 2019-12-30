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
      },
      {
        type: 'input',
        name: 'chatbotDescription',
        message: 'Enter a description of your chatbot',
        default: this.appname
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'Who is the author of this chatbot?',
        default: 'N/A'
      },
      {
        type: 'input',
        name: 'companyName',
        message: 'What is the company name (leave blank if none)?',
        default: 'N/A'
      }
    ]);

    this.log(
      yosay(`Your chatbot is called ${chalk.green(this.answers.chatbotName)}`)
    )

  }

  writing() {
    const { chatbotName, chatbotDescription, authorName, companyName } = this.answers

    this.fs.copyTpl(
      this.templatePath(`frontend`),
      this.destinationPath(`${ chatbotName }-frontend`),
      {chatbotName, chatbotDescription, authorName, companyName }
    );

    this.fs.copyTpl(
      this.templatePath('vchat-serverless-backend'),
      this.destinationPath(`${ chatbotName }-serverless-backend`),
      {chatbotName, chatbotDescription, authorName, companyName}
    );

    this.fs.copyTpl(
      this.templatePath('vchat-voxa'),
      this.destinationPath(`${ chatbotName }-voxa`),
      {chatbotName, chatbotDescription, authorName, companyName}
    );

    this.fs.copyTpl(
      this.templatePath('set-up-your-chatbot-step-by-step-guide.md'),
      this.destinationPath(`set-up-${chatbotName}-step-by-step-guide.md`),
      {chatbotName, chatbotDescription, authorName, companyName}
    );

    this.fs.copyTpl(
      this.templatePath('vchat - Utterances-en-AU.xlsx'),
      this.destinationPath(`${chatbotName} - Utterances-en-AU.xlsx`),
      {chatbotName, chatbotDescription, authorName, companyName}
    );
  }
  
  // Installs dependencies to the frontend folder 
  // install() {
  //   const npmdir = process.cwd() + '/frontend';
  //   process.chdir(npmdir);
  //   this.installDependencies({ bower: false, npm: true})
  // }

  end() {
    const { chatbotName } = this.answers
    this.log(
      yosay(`Frontend, Backend and Voxa Folders have been created, to install dependencies cd into the folders and run "npm install" or "yarn install" then follow the instructions in the "set-up-${chatbotName}-step-by-step-guide" Markdown file in the root folder to see what the end product will look like head to https://vchat-bot.netlify.com/`)
    );

  }
};
