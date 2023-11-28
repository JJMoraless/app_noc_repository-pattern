interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>
}

type SuccessCallback = () => void
type ErroCallBack = (error: string) => void

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErroCallBack,
  ) {}

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url)
      if (!req.ok) {
        throw new Error('Error on Check Service url ' + url)
      }
      this.successCallback()
      return true
    } catch (error) {
      this.errorCallback(`${error}`)
      return false
    }
  }
}
