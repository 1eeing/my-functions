type IPromiseTask = (resolve: Resolve, reject: Reject) => void

type Resolve = (sv: any) => void

type Reject = (jv: any) => void

type Status = 'pending' | 'reject' | 'resolve'

const defaultReject: Reject = () => { }

class IPromise {
  private status: Status
  private task: IPromiseTask

  constructor(task: IPromiseTask) {
    this.task = task;
  }

  static resolve() { }

  static reject() { }

  public then(resolve: Resolve, reject: Reject = defaultReject) {
    this.task(resolve, reject);
    return this
  }

  public catch() { }

  public race() { }

  public all() { }

  public finally() { }
}

export default IPromise
