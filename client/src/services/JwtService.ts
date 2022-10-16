class JwtService {
  private static tokenName = 'token'

  public static getToken():string|null {
    return localStorage.getItem(this.tokenName)
  }

  public static setToken(token: string):void {
    localStorage.setItem(this.tokenName, token)
  }

  public static destroyToken():void {
    localStorage.removeItem(this.tokenName)
  }
}

export default JwtService
