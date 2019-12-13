import axios from 'axios';

  class TaskService {
  constructor() {
    this.taskService = axios.create({
      baseURL: 'http://localhost:5000/task',
      withCredentials: true,
    });
  }

  createTask = (oneTask) => {
    const { name, description } = oneTask;
    return this.taskService
    .post('/', { name, description })
    .then( response => {
      console.log(response.config.data)
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

}

const taskService = new TaskService();

export default taskService;
