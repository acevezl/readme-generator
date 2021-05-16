let fs = require('fs');
let inquirer = require('inquirer');
let path = require('path');

const generateReadMe = (data) => {
    
    let readMeText = `
# ${data.projectTitle}
${licenseBadge(data.license)}

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

## License
${data.license}

## Credits
${data.credits}

## Test Instructions
${data.tests}

## Questions
E-mail me: <${data.email}>
Checkout my Github profile: [${data.githubUser}](https://github.com/${data.githubUser})
`;

    fs.access(path.join(__dirname,'output'), function(error) {
        if (error) {
            fs.mkdir(path.join(__dirname,'output'), function(err) {
                console.log(err);
            });
        } 
    });

    fs.writeFile(path.join(__dirname,'output/README.md'), readMeText, function(err) {
        if (err) {
          return console.log(err);
        } else {
            return console.log('Your README.md file is ready inside the /output folder');
        }
    
    });

};

const licenseBadge = (license) => {
    
    let badge = '';

    switch (license) {
        case 'Apache License 2.0':
            badge = '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
            break;
        case 'GNU General Public License v3.0':
            badge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
            break;
        case 'MIT License':
            badge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
            break;
        case 'BSD 2-Clause "Simplified" License':
            badge = '[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)';
            break;
        case 'BSD 3-Clause "New" or "Revised" License':
            badge = '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)';
            break;
        case 'Boost Software License 1.0':
            badge = '[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)';
            break;
        case 'Creative Commons Zero v1.0 Univeresal':
            badge ='[![License: CC0-1.0](https://img.shields.io/badge/License-CC0%201.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)';
            break;
        case 'Eclipse Public License 2.0':
            badge = '[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)';
            break;
        case 'GNU Affero General Public License v3.0':
            badge = '[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)';
            break;
        case 'GNU General Public License v2.0':
        case 'GNU Lesser General Public License v2.1':
            badge = '[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)';
            break;
        case 'Mozilla Public License 2.0':
            badge = '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)';
            break;
        case 'The Unlicense':
            badge = '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)';
            break;
        default:
          badge = 'None';
    };

    return badge;
};

const promptInfo = [
    {
        type: 'input',
        name: 'projectTitle',
        message: 'Project Title:',
        default: 'My Super Project'
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
        message: 'Contributing Credits:',
        defaut: 'List your collaborators, if any, with links to their GitHub profiles.'
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Test Instructions:',
        defaut: 'Describe the steps to test the app here.'
    },
    {
        type: 'input',
        name: 'githubUser',
        message: 'Your Github Username:',
        defaut: ''
    },
    {
        type: 'input',
        name: 'email',
        message: 'Your contact e-mail:',
        defaut: ''
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