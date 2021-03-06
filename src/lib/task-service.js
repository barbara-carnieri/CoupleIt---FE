import axios from 'axios';

  class TaskService {
  constructor() {
    this.taskService = axios.create({
      // baseURL: 'http://localhost:5000/task',
      baseURL: process.env.REACT_APP_API_URL + '/task',
      withCredentials: true,
    });
  }

  createTask = (oneTask) => {
    const { name, description, completed } = oneTask;
    return this.taskService
    .post('/', { name, description, completed })
    .then( response => {
        const {newTask} = response.config.data;
        return newTask;
    })
    .catch( err => console.log(err))
}

  getTasks() {
    return this.taskService
      .get('/')
      .then(response => response.data);
  }


  getOneById(id) {
    return this.taskService
              .get(`/${id}`)
              .then(response => response.data);
 
  }

  getOneDelete(id) {
    return this.taskService
              .delete(`/${id}`)
              .then(response => response.data)
              .catch( (err) => console.log(err));
  }

  getOneUpdate(id, oneTask) {
    const { name, description, completed } = oneTask;
    return this.taskService
              .put(`/${id}`, {name, description, completed})
              .then(response => response.data)
              .catch( (err) => console.log(err));
  }
}

const taskService = new TaskService();

export default taskService;
