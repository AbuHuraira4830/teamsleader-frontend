export const convertToInitialDataFormat = (data) => {
  const initialData = {
    tasks: {},
    columns: {},
    columnOrder: [],
  };

  data.forEach((row) => {
    const taskId = `${row.id}`;
    const columnId = row.status.text.toLowerCase();

    // Update tasks object
    initialData.tasks[taskId] = {
      id: taskId,
      title: row.task,
      status: row.status,
    };

    // Update columns object
    if (!initialData.columns[columnId]) {
      initialData.columns[columnId] = {
        id: columnId,
        title: row.status.text,
        taskIds: [],
        backgroundColor: row.status.backgroundColor,
      };
      initialData.columnOrder.push(columnId);
    }

    initialData.columns[columnId].taskIds.push(taskId);
  });

  return initialData;
};

// Example usage
const inputData = [
  {
    id: "38836046430522457",
    selected: false,
    status: {
      text: "Working on it",
      backgroundColor: "#fdab3d",
    },
    task: "Task 1",
    data: {},
  },
  {
    id: "82528074059697565906",
    selected: false,
    status: {
      text: "Working on it",
      backgroundColor: "#fdab3d",
    },
    task: "Task 2",
    data: {},
  },
  {
    id: "9431661841989058453573",
    selected: false,
    status: {
      text: "Done",
      backgroundColor: "#00c875",
    },
    task: "Task 3",
    data: {},
  },
];

// const initialData = convertToInitialDataFormat(inputData);

// Function to convert back to rows array format
export const convertToRowsFormat = (initialData) => {
  const rows = [];
  const taskIds = Object.keys(initialData.tasks);

  taskIds.forEach((taskId) => {
    console.log(taskId)
    const task = initialData.tasks[taskId];
    const status = task.status || {};

    rows.push({
      id: taskId,
      selected: false,
      status: {
        text: status.text || "",
        backgroundColor: status.backgroundColor || "",
      },
      task: task.title,
      data: {},
    });
  });

  return rows;
};

// // Example usage
// const convertedRows = convertToRowsFormat(initialData);
// console.log({ convertedRows });

export const colorsArray = [
  { id: 1, color: "#FF0000" },
  { id: 2, color: "#00FF00" },
  { id: 3, color: "#0000FF" },
  { id: 4, color: "#FFFF00" },
  { id: 5, color: "#FF00FF" },
  { id: 6, color: "#00FFFF" },
  { id: 7, color: "#FFA500" },
  { id: 8, color: "#800080" },
  { id: 9, color: "#008000" },
  { id: 10, color: "#800000" },
  { id: 11, color: "#008080" },
  { id: 12, color: "#808000" },
  { id: 13, color: "#C0C0C0" },
  { id: 14, color: "#FFD700" },
  { id: 15, color: "#A52A2A" },
  { id: 16, color: "#32CD32" },
  { id: 17, color: "#FA8072" },
  { id: 18, color: "#4682B4" },
  { id: 19, color: "#87CEEB" },
  { id: 20, color: "#F08080" },
  { id: 21, color: "#00CED1" },
  { id: 22, color: "#FF6347" },
  { id: 23, color: "#8B4513" },
  { id: 24, color: "#6A5ACD" },
  { id: 25, color: "#2E8B57" },
];

// const BASE_URL = "http://localhost:8888/api";
const BASE_URL = "https://teaamsleader-backend.onrender.com/api";

export const sendRequest = async (
  url,
  method,
  body = null,
  authToken = null,
  headers = {}
) => {
  const requestOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
  };

  if (authToken) {
    requestOptions.headers["auth-token"] = authToken;
  }

  try {
    const response = await fetch(`${BASE_URL}/${url}`, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      return data;
    }

    return data;
  } catch (error) {
    console.error("API Error:", error.message);
    return error;
  }
};
