import assign from 'object-assign';
import thunk from 'redux-thunk';
import { addDataToFirebase, createMockStore } from 'test/utils';

import {
  CREATE_TRIP_SUCCESS,
  DELETE_TRIP_SUCCESS,
  UPDATE_TRIP_SUCCESS
} from './action-types';

import {
  createTrip,
  deleteTrip,
  updateTrip,
  registerListeners
} from './actions';


describe('Tasks actions', () => {
  describe('createTask', () => {
    it('should create CREATE_TASK_SUCCESS', (done) => {
      const expectedActions = [(action) => {
        return action.type === CREATE_TASK_SUCCESS &&
               action.payload.title === 'create task';
      }];

      const firebase = new MockFirebase();

      const store = createMockStore({
        auth: {id: '123'},
        firebase: firebase,
        tasks: []
      }, expectedActions, [thunk], done);

      store.dispatch(registerListeners());
      store.dispatch(createTask('create task'));

      firebase.flush();
    });
  });


  describe('deleteTask', () => {
    it('should create DELETE_TASK_SUCCESS', (done) => {
      const auth = {id: '123'};
      const firebase = new MockFirebase();
      const task = addDataToFirebase({title: 'delete task'}, firebase, `tasks/${auth.id}`);

      const expectedActions = [
        {type: CREATE_TASK_SUCCESS, payload: task},
        {type: DELETE_TASK_SUCCESS, payload: task}
      ];

      const store = createMockStore({
        auth,
        firebase,
        tasks: []
      }, expectedActions, [thunk], done);

      store.dispatch(registerListeners());
      store.dispatch(deleteTrip(task));

      firebase.flush();
    });
  });


  describe('undeleteTrip', () => {
    it('should create UPDATE_TASK_SUCCESS', (done) => {
      const auth = {id: '123'};
      const changes = {title: 'updated title'};
      const firebase = new MockFirebase();
      const task = addDataToFirebase({title: 'update task'}, firebase, `tasks/${auth.id}`);

      const expectedActions = [
        {type: CREATE_TASK_SUCCESS, payload: task},
        {type: UPDATE_TASK_SUCCESS, payload: assign({}, task, changes)}
      ];

      const store = createMockStore({
        auth,
        firebase,
        tasks: []
      }, expectedActions, [thunk], done);

      store.dispatch(registerListeners());
      store.dispatch(updateTask(task, changes));

      firebase.flush();
    });
  });
});
