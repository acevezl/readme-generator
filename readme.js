let fs = require('fs');
let inquirer = require('inquirer')

const generateReadMe = (data) => {
    console.log(data);
    
    let readMeText = `
# ${data.projectTitle}

## Description
${data.projectDescription}

## Table of Contents
* [Installation](##Installation)
* [Usage](##Usage)
* [Credits](##Credits)
* [License](##License)

## Installation
${data.installation}

## Usage
${data.usage}

## Credits
${data.credits}

## License
${data.license}
`;

    fs.writeFile('README.md', readMeText, function(err) {
        if (err) {
          return console.log(err);
        } else {
            return console.log('Your README.md file is ready!');
        }
    
    });

 };

const promptInfo = [
    {
        type: 'input',
        name: 'projectTitle',
        message: 'Project Title:',
        default: 'Ex. My Super Project'
    },
    {
        type: 'input',
        name: 'projectDescription',
        message: 'Project Description:',
        default: 'Provide a short description explaining the what, why, and how. What was your motivation? Why did you build this project?'
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Installation:',
        default: 'What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Usage:',
        default: 'Provide instructions and examples for use.'
    },
    {
        type: 'input',
        name: 'credits',
        message: 'Credits:',
        defaut: 'List your collaborators, if any, with links to their GitHub profiles.'
    },
    {
        type: 'list',
        name: 'license',
        message: 'License',
        choices: ['None', 'Apache License 2.0', 'GNU General Public License v3.0', 'MIT License','BSD 2-Clause "Simplified" License',
    'BSD 3-Clause "New" or "Revised" License','Boost Software License 1.0', 'Creative Commons Zero v1.0 Univeresal', 'Eclipse Public License 2.0',
    'GNU Affero General Public License v3.0','GNU General Public License v2.0','GNU Lesser General Public License v2.1',
    'Mozilla Public License 2.0', 'The Unlicense']
    }
];

inquirer.prompt(
    promptInfo
).then(answers => {
    generateReadMe(answers);
}).catch(error => {
    if(error.isTtyError) {
        console.log('Prompt couldn\'t be rendered')
    } else {
        console.log(error);
    }
});