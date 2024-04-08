#! usr/bin/env node
// ----------------Problem-----------------------
// Maintain a ToDo list for user, add, delete and view to do tasks
// utilised inquirer.js for asking data input from user
import chalk from "chalk";
import inquirer from "inquirer";
console.log(chalk.bgCyan.bold("------ Welcome to ToDo List by Amir-------"));
async function taskAdition() {
    const newTask = await inquirer.prompt([
        {
            name: "addTask",
            type: "input",
            message: "Please enter task to add into ToDo list:",
            validate: (answer) => {
                if (answer == "") {
                    return "You have entered nothing, Please enter a valisd Task";
                }
                return true;
            }
        }
    ]);
    tasks.push(newTask.addTask);
    console.log(`"${chalk.green.bold(newTask.addTask)}" Task has been added to your ToDo list`);
}
async function updateTask() {
    viewToDoList();
    if (tasks.length == 0) {
        console.log("ToDo list is empty, There is no Task to Update!");
    }
    else {
        const taskUpdate = await inquirer.prompt([
            {
                name: "taskToUpdate",
                type: "number",
                message: "Enter Index Number of the Task which you want to update: ",
                validate: (answer) => {
                    if ((isNaN(answer) || answer < 0 || answer > tasks.length)) {
                        return "---Index does not exist!, Enter a valid Index";
                    }
                    return true;
                }
            }
        ]);
        let userUpdate = await inquirer.prompt([
            {
                name: "addTask",
                type: "input",
                message: "Please enter task:",
                validate: (answer) => {
                    if (answer == "") {
                        return "---You have entered nothing, Please enter a valid Task";
                    }
                    return true;
                }
            }
        ]);
        console.log(`${chalk.bgCyan.bold(tasks[taskUpdate.taskToUpdate - 1])} has been updated in the ToDo list`);
        tasks[taskUpdate.taskToUpdate - 1] = userUpdate.addTask;
    }
}
async function deleteTask() {
    viewToDoList();
    if (tasks.length == 0) {
        console.log("ToDo list is empty, There is no Task to Delete!");
    }
    else {
        const taskDelete = await inquirer.prompt([
            {
                name: "taskToDelete",
                type: "number",
                message: "Enter Index Number of the Task which you want to delete: ",
                validate: (answer) => {
                    if ((isNaN(answer) || answer < 0 || answer > tasks.length)) {
                        return "---Index does not exist!Enter a valid Index";
                    }
                    return true;
                }
            }
        ]);
        let deletedTask = tasks.splice(taskDelete.taskToDelete - 1, 1);
        console.log(`${chalk.bgRed.bold(deletedTask)} has been removed from the ToDo list`);
    }
}
function viewToDoList() {
    console.log(chalk.bold.blueBright("Your ToDo list:"));
    tasks.forEach((task, index) => {
        console.log(`${index + 1}: ${task}`);
    });
    // for (var i=0;i<tasks.length;i++)
    //     {
    //          let b:number=i+1;
    //         console.log(`${b}: ${tasks[i]}`)
    //     }
}
var again = true;
var tasks = [];
do {
    const userInput = await inquirer.prompt([{
            name: "actions",
            type: "list",
            choices: ["Add a Task", "Update a Task", "Deltete a Task", "View Your ToDo list", "Exit"],
            message: "Choose an operation:"
        }]);
    switch (userInput.actions) {
        case "Add a Task":
            {
                await taskAdition();
            }
            break;
        case "View Your ToDo list":
            {
                viewToDoList();
            }
            break;
        case "Deltete a Task":
            {
                await deleteTask();
                console.log(chalk.bgGray.bold("Task Deleted! ToDoList has been updated"));
                viewToDoList();
            }
            break;
        case "Update a Task":
            {
                await updateTask();
                console.log(chalk.bgGray.bold("Task Updated! ToDoList has been updated"));
                viewToDoList();
            }
            break;
        case "Exit":
            {
                console.log(chalk.bold.bgGreenBright("See You Again!"));
                again = false;
            }
            break;
    }
} while (again);
