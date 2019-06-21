import axios from 'axios';
import { notification as Notification } from 'antd';

export class Proxy {
  constructor(endpoint = '', parameters = {}) {
    this.endpoint = endpoint;
    this.parameters = parameters;
  }

  // Parse parameters
  getParameterString(obj, prefix) {
    var str = [], p;
    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        var k = prefix ? prefix + "[" + p + "]" : p,
          v = obj[p];
        str.push((v !== null && typeof v === "object") ?
          this.getParameterString(v, k) :
          encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
    }
    return str.join("&");
  }

  // Arrange request
  submit(requestType, url, data = null) {
    return new Promise((resolve, reject) => {
      let str = this.getParameterString(this.parameters);
      axios[requestType]( this.endpoint + url + (str !== '' ? `?${str}` : ''), data).then(response => {
        let result = response.data;
        if(!result.success)
        {
          Notification.error({
            message: 'Error!',
            description: result.message
          });
        }
        resolve(result.data);
      }).catch(error => {
        Notification.error({
          message: 'Error',
          description: error.message
        });
        if(error && error.response) {
            reject(error.response.data);
        }
        else {
          reject();
        }
      });
    });
  }
}

export default Proxy;
