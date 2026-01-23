import { useState, useEffect } from "react";

const API_URL = "http://localhost:8080/api/todos";
const Todo = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const [tasks, setTasks] = useState({
    newlyAdded: [],
    pending: [],
    completed: []
  });

  const [editMode, setEditMode] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  /* LOAD */
  useEffect(() => {
    loadTodos();
  }, []);

  // /* SAVE */
  // useEffect(() => {
  //   localStorage.setItem("todoTasks", JSON.stringify(tasks));
  // }, [tasks]);

  /* ADD */
  const addTask = () => {
    if (!taskName.trim()) return alert("Enter task name");

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: taskName,
        description: taskDescription,
        status: "NEW"
      })
    })
      .then(res => res.json())
      .then(savedTask => {
        setTasks(prev => ({
          ...prev,
          newlyAdded: [
            savedTask,        // ✅ HAS id
            ...prev.newlyAdded
          ]
        }));
      });

    setTaskName("");
    setTaskDescription("");
  };

  /* MOVE */
  const moveTask = async (from, to, index) => {
    const task = tasks[from][index];
    if (!task || !task.id) {
      console.log("Task or ID missing");
      return;
    }

    const newStatus =
      to === "pending" ? "PENDING" : "COMPLETED";

    console.log("Before move API call:");
    console.log("Task from state:", task);
    console.log("Calculated new status:", newStatus);

    await fetch(`${API_URL}/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: task.id,
        name: task.name,
        description: task.description,
        status: newStatus
      })
    });

    loadTodos(); // reload from DB
  };


  const loadTodos = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setTasks({
          newlyAdded: data.filter(t => t.status === "NEW"),
          pending: data.filter(t => t.status === "PENDING"),
          completed: data.filter(t => t.status === "COMPLETED")
        });
      });
  };


  /* OPEN EDIT MODAL */
  const openEdit = (category, task, index) => {
    setEditingTask({ ...task });
    setEditIndex(index);
    setEditMode(category);

    window.bootstrap.Modal.getOrCreateInstance(
      document.getElementById("editModal")
    ).show();
  };

  /* SAVE EDIT */
  const saveEdit = () => {
    setTasks(prev => {
      const updated = [...prev[editMode]];
      updated[editIndex] = editingTask;
      fetch(`${API_URL}/${editingTask.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingTask)
      });
      return { ...prev, [editMode]: updated };
    });

    window.bootstrap.Modal.getInstance(
      document.getElementById("editModal")
    ).hide();
  };

  const deleteTask = (category, index) => {
    const task = tasks[category][index];
    if (!task || !task.id) return;

    setTasks(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index)
    }));

    fetch(`${API_URL}/${task.id}`, {
      method: "DELETE"
    });
  };

  return (
    <div className="container my-5" style={{ maxWidth: 700 }}>
      <h2 className="text-center mb-4">Todo List</h2>

      {/* ADD TASK */}
      <input
        className="form-control mb-2"
        placeholder="Task Name"
        value={taskName}
        onChange={e => setTaskName(e.target.value)}
      />

      <textarea
        className="form-control mb-3"
        placeholder="Task Description"
        value={taskDescription}
        onChange={e => setTaskDescription(e.target.value)}
      />

      <button className="btn btn-primary w-100" onClick={addTask}>
        Add Task
      </button>

      {/* SECTIONS */}
      <Section
        title="Newly Added"
        category="newlyAdded"
        tasks={tasks.newlyAdded}
        editMode={editMode}
        setEditMode={setEditMode}
        onMove={(i) => moveTask("newlyAdded", "pending", i)}
        onEdit={openEdit}
        onDelete={deleteTask}
      />

      <Section
        title="Pending"
        category="pending"
        tasks={tasks.pending}
        editMode={editMode}
        setEditMode={setEditMode}
        onMove={(i) => moveTask("pending", "completed", i)}
        onEdit={openEdit}
        onDelete={deleteTask}
      />

      <Section
        title="Completed"
        category="completed"
        tasks={tasks.completed}
        editMode={editMode}
        setEditMode={setEditMode}
        onMove={null}          // ❌ NO MOVE
        onEdit={openEdit}
        onDelete={deleteTask}
      />


      {/* EDIT MODAL */}
      <div className="modal fade" id="editModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Edit Task</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <input
                className="form-control mb-2"
                value={editingTask?.name || ""}
                onChange={e =>
                  setEditingTask({ ...editingTask, name: e.target.value })
                }
              />
              <textarea
                className="form-control"
                value={editingTask?.description || ""}
                onChange={e =>
                  setEditingTask({
                    ...editingTask,
                    description: e.target.value
                  })
                }
              />
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button className="btn btn-success" onClick={saveEdit}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* SECTION COMPONENT */
const Section = ({
  title,
  category,
  tasks,
  editMode,
  setEditMode,
  onMove,
  onEdit,
  onDelete
}) => (
  <>
    <div className="d-flex justify-content-between align-items-center mt-4">
      <h4>{title}</h4>
      <button
        className="btn btn-sm btn-outline-secondary"
        onClick={() =>
          setEditMode(editMode === category ? null : category)
        }
      >
        Edit
      </button>
    </div>

    {tasks.length === 0 && <p className="text-muted">No tasks</p>}

    {tasks.map((task, index) => (
      <TaskItem
        key={index}
        task={task}
        showActions={editMode === category}
        onMove={onMove ? () => onMove(index) : null}   // ✅ CONDITIONAL
        onEdit={() => onEdit(category, task, index)}
        onDelete={() => onDelete(category, index)}
      />

    ))}
  </>
);

/* TASK ITEM */
const TaskItem = ({ task, showActions, onMove, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border p-2 mt-2 rounded">
      <div className="d-flex justify-content-between align-items-start">
        <div onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
          <strong>{task.name}</strong>
          {open && (
            <div className="text-muted mt-1">
              {task.description || "No description"}
            </div>
          )}
        </div>

        <div className="ms-3 d-flex gap-1">
          {onMove && (
            <button
              className="btn btn-sm btn-success"
              onClick={onMove}
            >
              Move
            </button>
          )}

          {showActions && (
            <>
              <button
                className="btn btn-sm btn-warning"
                onClick={onEdit}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={onDelete}
              >
                Delete
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default Todo;
