/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

class ApiService {
  private static axios = axios;

  public static init(): void {
    // this.axios.defaults.baseURL = process.env.BASE_URL
    this.axios.defaults.baseURL = 'http://localhost:8080'
  }

  public static setHeader(): void {
    this.axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`
    this.axios.defaults.headers.common.Accept = 'application/json'
    this.axios.defaults.headers.common['Content-Type'] = 'application/json'
  }

  public static get(resource:string, config?:AxiosRequestConfig):Promise<AxiosResponse> {
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

  public static delete(resource:string, config?:AxiosRequestConfig):Promise<AxiosResponse> {
    return this.axios.delete(resource, config)
  }
}

export default ApiService
