import axios from 'axios';
import { authHeader } from './base.service';

class HelloWorldService {

    executeHelloWorldService(username) {
        return axios.get(`http://192.168.0.105:8080/hello-world/${username}`, {headers: authHeader()});
    }
}

export default new HelloWorldService();