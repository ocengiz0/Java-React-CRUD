import * as types from './action-types';
import { UserServiceProxy } from '../../../proxies';
import { notification as Notification } from 'antd';

const getUserList = () => {
    return dispatch => new Promise((resolve, reject) => {
        return new UserServiceProxy().getUserList().then(response => {
            dispatch({ type: types.SET_USER_DATA, payload: { data: response } });
            resolve(response);
        }).catch(error => {
            Notification.error({
                message: 'Error',
                description: (error && error.description) ? error.description : 'Unknown error occured.'
            });
            reject();
        })
    })
}

const addUser = (user) => {
    return dispatch => new Promise((resolve, reject) => {
        return new UserServiceProxy().addUser(user).then(response => {
            dispatch({ type: types.ADD_USER_DATA, payload: { data: response } });
            resolve(response);
        }).catch(error => {
            Notification.error({
                message: 'Error',
                description: error.message
            });
        })
    })
}

const updateUser = (id, user) => {
    return dispatch => new Promise((resolve, reject) => {
        return new UserServiceProxy().updateUser(id, user).then(response => {
            dispatch({ type: types.UPDATE_USER_DATA, payload: { data: response } });
            resolve(response);
        }).catch(error => {
            Notification.error({
                message: 'Error',
                description: error.message
            });
        })
    })
}

const deleteUser = (id) => {
    return dispatch => new Promise((resolve, reject) => {
        return new UserServiceProxy().deleteUser(id).then(response => {
            dispatch({ type: types.DELETE_USER_DATA, payload: { data: response } });
            resolve(response);
        }).catch(error => {
            Notification.error({
                message: 'Error',
                description: error.message
            });
        })
    })
}
export default {
    getUserList,
    addUser,
    updateUser,
    deleteUser
}
