type IPromiseTask = (resolve: Resolve, reject: Reject) => void

type Resolve = (sv: any) => void

type Reject = (jv: any) => void

type Status = 'pending' | 'reject' | 'resolve'

class IPromise {
  private status: Status
  private task: IPromiseTask

  constructor(task: IPromiseTask) {
    this.task = task;
  }

  public then() {

  }
}

export default IPromise
