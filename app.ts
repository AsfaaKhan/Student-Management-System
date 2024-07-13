#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";


console.log(`Welcome to Student Managment System`);

class Student {
    static counter = 101;
    id: number;
    name: string;
    course: string[] = [];
    balance: number;


    constructor(name: string,  ) {
        this.id = Student.counter++;
        this.name = name;
        this.course= []// Initilizing an empty array for course 
        this.balance = 50000;
    }
     

    //   METHOD TO ENROLL IN A COURSE 
    enrollCourse(course: string) {
        this.course.push(course)
    }

    //   METHOD TO VIEW A STUDENT BALANCE 
    viewBlance() {
        console.log(chalk.magenta(`\nBalance for ${this.name} : $${this.balance}\n`));
    }

    //   METHOD TO PAY A STUDENT FEE 
    payFee(amount: number) {
        if(amount <= this.balance ){
        this.balance -= amount; //use subtraction assignmnet operator
        console.log(chalk.magenta(`\n${amount} Fees paid successfully for ${this.name}!\n`));
        }
        else {
            console.log(chalk.red("\nInsufficient Balance\n"))
        }
    }
    //   METHOD TO DISPLAY STUDENT STATUS
    showStatus() {
        console.log(chalk.greenBright(`ID : ${this.id}`));
        console.log(chalk.greenBright(`NAME : ${this.name}`));
        console.log(chalk.greenBright(`COURSE : ${this.course}`));
        console.log(chalk.greenBright(`BALANCE : ${this.balance}`))
    }
}


//  DEFINE A STUDENT MANAGER TO MANAGE STUDENTS
class StudentManager {
    students: Student[]
    constructor() {
        this.students = [];
    }
    // METHOD TO ADD A NEW STUDENT 
    addStudent(name: string) {
        let studentName = new Student(name);
        this.students.push(studentName);
        console.log(chalk.magentaBright(`\nStudent ${name} added successfully.\nStudent ID : ${studentName.id}\n`));
    }
    // METHOF TO FIND STUDENT BY STD ID
    findStudentName(studentId: number ) {
        return this.students.find(std => std.id === studentId);
    }

    // METHOD TO PAY FEES
    payStudentFee(studentId : number, amount : number){
        let student  = this.findStudentName(studentId);
        if(student ){
            chalk.magenta(student.payFee(amount))
        }
        else {
            console.log(chalk.red("\nStudent Not Found!!\n"))
        }
    }
    //METHOD TO DISPLY A STUDENT IN COURSE 
    enrollStudent(studentId: number, course: string) {
        let findStudent = this.findStudentName(studentId)
        if (findStudent) {
            findStudent.enrollCourse(course);
            console.log(chalk.magentaBright(`\n${findStudent.name} has enrolled in ${course} Course Sccessfully!\n`));
        }else {
            console.log(chalk.red("\nInvalid Student ID\n"))
        }
    }
    //METHOD TO VIEW A STD BALANCE 
    viewStudentBalance(studentId: number) {
        let findStudent = this.findStudentName(studentId)
        if (findStudent) {
            chalk.magenta(findStudent.viewBlance())
        }
    }

    // METHOD TO SHOW STATUS
    showStudentStatus (studentId : number){
        let student = this.findStudentName(studentId);
        if(student){
            student.showStatus();
        }
    }
}

async function main() {
    console.log(chalk.redBright.bold("\n\t\t\tWelcome to Student Managament System"))
    console.log(chalk.green("\t\t\t" + "=".repeat(37)))

    let studentManager = new StudentManager()

    while (true) {
        let choice = await inquirer.prompt({
            name: "ans",
            type: "list",
            message: "Which Action Do you want to perfrom?",
            choices: ["Add Students", "Enroll Student", "View Student Balance", "Pay Fees", "Show Status", "Exit"]
        })

        // Using IF Else Condition
        if (choice.ans === "Add Students") {
            let nameInput = await inquirer.prompt({
                name: "name",
                type: "input",
                message: "\nEnter The Student Name : "
            })
            studentManager.addStudent(nameInput.name)
        }
        else if (choice.ans === "Enroll Student") {
            let course = await inquirer.prompt([{
                name: "name",
                type: "number",
                message: "Enter A student Id : "
            },
            {
                name: "course",
                type: "list",
                message: "Select The Course",
                choices: ["JavaScript", "Web Design & Development","Phython"]
            },
        ])
            studentManager.enrollStudent(course.name, course.course)
        }
        else if (choice.ans === "View Student Balance") {
            let balanceInput = await inquirer.prompt({
                name : "ans",
                type : "number",
                message :"Enter A Student Id : ",
            })
            studentManager.viewStudentBalance(balanceInput.ans)
        }
        else if (choice.ans === "Pay Fees") {
            let courseFee = await inquirer.prompt([{
                name : "ans1",
                type : "number",
                message :"\nEnter A Student Id : ",
            },
        {
                name : "ans2",
                type : "number",
                message :"\nEnter The Amount of fees : ",
        }])
        studentManager.payStudentFee(courseFee.ans1, courseFee.ans2)
        }
        else if (choice.ans === "Show Status") {
            let status = await inquirer.prompt([{
                name : "ans3",
                type : "number",
                message :"Enter A Student Id : ",
            }])
            studentManager.showStudentStatus(status.ans3)

        }
        else if (choice.ans === "Exit") {
            console.log(chalk.blueBright("Exiting..........."))
            console.log(chalk.magenta("Thank You For Using!!"))
        break;
         }

    }
}
main()
