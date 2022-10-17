import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import JwtService from './JwtService'

// require('dotenv').config()

// console.log(process.env.BASE_URL)

class ApiService {
  private static axios = axios;

  public static init(): void {
    this.axios.defaults.baseURL = 'http://localhost:8080'
  }

  public static setHeader(): void {
    this.axios
      .defaults.headers.common.Authorization = `Bearer ${JwtService.getToken()}`
    this.axios.defaults.headers.common.Accept = 'application/json'
    this.axios.defaults.headers.common['Content-Type'] = 'application/json'
  }

  public static get(resource:string, config?:AxiosRequestConfig)
  :Promise<AxiosResponse> {
    return this.axios.get(resource, config)
  }

  public static post(resource:string, body:any, config?:AxiosRequestConfig)
  :Promise<AxiosResponse> {
    return this.axios.post(resource, body, config)
  }

  public static patch(resource:string, body:any, config?:AxiosRequestConfig)
  :Promise<AxiosResponse> {
    return this.axios.patch(resource, body, config)
  }

  public static put(resource:string, body:any, config?:AxiosRequestConfig)
  :Promise<AxiosResponse> {
    return this.axios.put(resource, body, config)
  }

  public static delete(resource:string, config?:AxiosRequestConfig)
  :Promise<AxiosResponse> {
    return this.axios.delete(resource, config)
  }
}

export default ApiService
