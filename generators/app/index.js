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

    const chatbotNameNoSpaces = this.answers.chatbotName.replace(/ /g,"-")
    this.log(
      yosay(`Your chatbot is called ${chalk.green(chatbotNameNoSpaces)}`)
    )

  }

  writing() {
    const { chatbotName, chatbotDescription, authorName, companyName } = this.answers
    const chatbotNameNoSpaces = chatbotName.replace(/ /g,"-")
    this.fs.copyTpl(
      this.templatePath(`frontend`),
      this.destinationPath(`${ chatbotNameNoSpaces }-frontend`),
      {chatbotName: chatbotNameNoSpaces, chatbotDescription, authorName, companyName }
    );

    this.fs.copyTpl(
      this.templatePath('vchat-serverless-backend'),
      this.destinationPath(`${ chatbotNameNoSpaces }-serverless-backend`),
      {chatbotName: chatbotNameNoSpaces, chatbotDescription, authorName, companyName}
    );

    this.fs.copyTpl(
      this.templatePath('vchat-voxa'),
      this.destinationPath(`${ chatbotNameNoSpaces }-voxa`),
      {chatbotName: chatbotNameNoSpaces, chatbotDescription, authorName, companyName}
    );

    this.fs.copyTpl(
      this.templatePath('set-up-your-chatbot-step-by-step-guide.md'),
      this.destinationPath(`set-up-${chatbotNameNoSpaces}-step-by-step-guide.md`),
      {chatbotName: chatbotNameNoSpaces, chatbotDescription, authorName, companyName}
    );

    this.fs.copyTpl(
      this.templatePath('vchat - Utterances-en-AU.xlsx'),
      this.destinationPath(`${chatbotNameNoSpaces} - Utterances-en-AU.xlsx`),
      {chatbotName: chatbotNameNoSpaces, chatbotDescription, authorName, companyName}
    );

    this.fs.copy(
      this.templatePath(`set-up-imgs`),
      this.destinationPath(`set-up-imgs`)
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
      yosay(`Frontend, Backend and Voxa Folders have been created, to install dependencies cd into the folders and run "npm install" or "yarn install" then follow the instructions in the "set-up-${chatbotName}-step-by-step-guide" Markdown file in the root folder. To see what the end product will look like head to https://vchat-bot.netlify.com/`)
    );

  }
};
