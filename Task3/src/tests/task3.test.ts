import { Project } from '../project/project';
import { Task } from '../task/task';
import { TASK_STATUS } from '../constants/constants';
import { Developer } from '../developer/developer';

describe('----', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    if (consoleSpy) {
      consoleSpy.mockRestore();
    }
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    if (consoleSpy) {
      consoleSpy.mockRestore();
    }
  });

  describe('tests', () => {
    test('should create project and add components', () => {
      const project = new Project('Test Project');
      const task = new Task('Test Task');

      expect(project.getName()).toBe('Test Project');
      expect(task.getName()).toBe('Test Task');

      project.add(task);
      project.display();

      expect(consoleSpy).toHaveBeenCalledWith('Project: Test Project');
      expect(consoleSpy).toHaveBeenCalledWith('  Task: Test Task (New)');
    });

    test('should create nested project structure', () => {
      const mainProject = new Project('Main');
      const subProject = new Project('Subproj');
      const task = new Task('Task');

      subProject.add(task);
      mainProject.add(subProject);

      mainProject.display();

      expect(consoleSpy).toHaveBeenCalledWith('Project: Main');
      expect(consoleSpy).toHaveBeenCalledWith('  Project: Subproj');
      expect(consoleSpy).toHaveBeenCalledWith('    Task: Task (New)');
    });

    test('should remove components from project', () => {
      const project = new Project('Test Project');
      const task1 = new Task('Task 1');
      const task2 = new Task('Task 2');

      project.add(task1);
      project.add(task2);
      project.remove(task1);

      project.display();

      expect(consoleSpy).toHaveBeenCalledWith('Project: Test Project');
      expect(consoleSpy).toHaveBeenCalledWith('  Task: Task 2 (New)');
      expect(consoleSpy).not.toHaveBeenCalledWith('  Task: Task 1 (New)');
    });
  });

  describe('observer', () => {
    test('should notify developer when task status changes', () => {
      const developer = new Developer('John', 'john@test.com');
      const task = new Task('Test Task');

      task.addObserver(developer);
      task.setStatus(TASK_STATUS.InProgress);

      expect(consoleSpy).toHaveBeenCalledWith(
        'John (john@test.com) assigned to Test Task',
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'John (john@test.com) notified. Task "Test Task" status changed to In Progress',
      );
    });

    test('should notify multiple developers', () => {
      const dev1 = new Developer('Alice', 'alice@test.com');
      const dev2 = new Developer('Bob', 'bob@test.com');
      const task = new Task('Shared Task');

      task.addObserver(dev1);
      task.addObserver(dev2);
      task.setStatus(TASK_STATUS.Completed);

      expect(consoleSpy).toHaveBeenCalledWith(
        'Alice (alice@test.com) notified. Task "Shared Task" status changed to Completed',
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'Bob (bob@test.com) notified. Task "Shared Task" status changed to Completed',
      );
    });
  });

  describe('status', () => {
    test('should have correct initial status', () => {
      const task = new Task('New Task');
      expect(task.getStatus()).toBe(TASK_STATUS.New);
    });

    test('should update task status', () => {
      const task = new Task('Test Task');

      task.setStatus(TASK_STATUS.InProgress);
      expect(task.getStatus()).toBe(TASK_STATUS.InProgress);

      task.setStatus(TASK_STATUS.Completed);
      expect(task.getStatus()).toBe(TASK_STATUS.Completed);
    });

    test('should create task with custom initial status', () => {
      const task = new Task('Custom Task', TASK_STATUS.Testing);
      expect(task.getStatus()).toBe(TASK_STATUS.Testing);
    });
  });
});
