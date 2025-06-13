import { Project } from './project/project';
import { Task } from './task/task';
import { Developer } from './developer/developer';
import { TASK_STATUS } from './constants/constants';

const dev1 = new Developer('Alex', 'alex@mail.com');
const dev2 = new Developer('John', 'john@mail.com');
const dev3 = new Developer('Ivan', 'ivan@mail.com');

const task1 = new Task('develop API');
task1.addObserver(dev1);

const task2 = new Task('create UI');
task2.addObserver(dev2);

const task3 = new Task('set up database');
task3.addObserver(dev3);

// main project
const mainProject = new Project('web app');

const backendProject = new Project('backend');
const frontendProject = new Project('frontend');
backendProject.add(task1);
backendProject.add(task3);
frontendProject.add(task2);

mainProject.add(backendProject);
mainProject.add(frontendProject);

console.log('\n-- structure --');
mainProject.display();

console.log('\n-- updating --');
task1.setStatus(TASK_STATUS.InProgress);
task2.setStatus(TASK_STATUS.Completed);
task3.setStatus(TASK_STATUS.Testing);

console.log('\n-- final structure --');
mainProject.display();
