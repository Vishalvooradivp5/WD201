const todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Todolist Test Cases", () => {
  test("Adding new todo", () => {
    expect(all.length).toBe(0);
    add({
      title: "Complete Project",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA") - 1,
    });
    expect(all.length).toBe(1);
  });
  test("Todo markas complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("Check for overdue", () => {
    expect(all.length).toBe(1);
    const today = new Date();
    const oneDay = 60 * 60 * 24 * 1000;
    add({
      title: "Complete Project",
      completed: false,
      dueDate: new Date(today.getTime() - 1 * oneDay).toLocaleDateString(
        "en-CA"
      ),
    });
    expect(all.length).toBe(2);
    overdueItems = overdue();
    expect(overdueItems.length).toBe(1);
  });

  test("Check for duetoday", () => {
    expect(all.length).toBe(2);
    const today = new Date();
    add({
      title: "Go for shopping",
      completed: false,
      dueDate: new Date(today.getTime()).toLocaleDateString("en-CA"),
    });
    expect(all.length).toBe(3);
    duetoday = dueToday();
    expect(duetoday.length).toBe(1);
  });

  test("Check for duelater", () => {
    expect(all.length).toBe(3);
    const today = new Date();
    const oneDay = 60 * 60 * 24 * 1000;
    add({
      title: "Having the exam",
      completed: false,
      dueDate: new Date(today.getTime() + 1 * oneDay).toLocaleDateString(
        "en-CA"
      ),
    });
    expect(all.length).toBe(4);
    duelater = dueLater();
    expect(duelater.length).toBe(1);
  });
});