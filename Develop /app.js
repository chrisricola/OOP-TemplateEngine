const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];


    const managerquestion = [
        {
            type: "input",
            name: "managername",
            message:" Whats is your manager name?"
        },
        {
            type: "input",
            name: "managerid",
            message:" Whats is your manager ID?"
        },
        {
            type: "input",
            name: "manageremail",
            message:" Whats is your manager email?"
        },
        {
            type: "input",
            name: "managerofficenumber",
            message:" Whats is your manager office number?"
        },
        ];

    const employeequestion = [
        {
            type: "list",
            name: "data",
            message:" do you want to add a new team member?",
            choices: ["Engineer","Intern","not adding another enmployee"]
            },
        ];

    const internquestion = [
        {
            type: "input",
            name: "internname",
            message:" Whats is the intern's name?"
        },
        {
            type: "input",
            name: "internid",
            message:" Whats is the intern's ID?"
        },
        {
            type: "input",
            name: "internemail",
            message:" Whats is the intern's email?"
        },
        {
            type: "input",
            name: "school",
            message:" Whats school did the intern attend?"
        },
        ];

    const engineerquestion = [
        {
            type: "input",
            name: "engineername",
            message:" Whats is the engineer's name?"
        },
        {
            type: "input",
            name: "engineerid",
            message:" Whats is the engineer's ID?"
        },
        {
            type: "input",
            name: "engineeremail",
            message:" Whats is your email?"
        },
        {
            type: "input",
            name: "engineergithub",
            message:" What is your github profile?"
        },
        ];

    function init() {
        
            inquirer.prompt(managerquestion).then((data) => {
                const manager = new Manager(
                    data.managername,
                    data.managerid,
                    data.manageremail,
                    data.managerofficenumber
                );
            team.push(manager)
            addTeam();
        })
    }      
    
    const renderhtml = function() {
            if (!fs.existsSync(OUTPUT_DIR)){fs.mkdirSync(OUTPUT_DIR)}
            fs.writeFileSync(outputPath,render(team))
        }
    function addTeam(){
        inquirer.prompt(employeequestion).then(({data}) =>{
            if(data== "Engineer"){
                addEngineer();
            } else if(data == "Intern"){
                addIntern();
            } else{
               renderhtml(); 
            }
        })
    }
    function addIntern(){
        inquirer.prompt(internquestion).then((data) => {
            const intern = new Intern(
                data.internname,
                data.internid,
                data.internemail,
                data.school
            );
        team.push(intern)
    })
    setTimeout(addTeam, 1000);
}
    function addEngineer(){
        inquirer.prompt(engineerquestion).then((data) => {
            const engineer = new Engineer(
                data.engineernname,
                data.engineerid,
                data.engineeremail,
                data.engineergithub
            );
        team.push(engineer)
    }) 
    setTimeout(addTeam, 1000)
}
init();




// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ``



// const arr = ["a","b","c","d"];
// const obj = {
//     name: "Chris",
//     age: 20,
//     girlfriend: {
//         name: "girlfriend",
//         age: 18
//     }
// }
// const {girlfriend:{age}} = obj;
// const[chris, ,eric] = arr;
// console.log(chris,eric)