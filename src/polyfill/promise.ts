type IPromiseTask = (resolve: Resolve, reject: Reject) => void

type Resolve = (sv: any) => void

type Reject = (jv: any) => void

type Status = 'pending' | 'rejected' | 'resolved'

const defaultReject: Reject = () => { }

class IPromise {
  private status: Status
  private prevArgs: any

  constructor(
    private task: IPromiseTask
  ) {
    this.task = this.injectorTask(this.task);
  }

  private injectorResolve = (resolve) => {
    const _this = this;
    return function (...args) {
      try {
        // 拿到第一次resolve执行完的结果
        const res = resolve.apply(this, _this.prevArgs ? [_this.prevArgs] : args);
        _this.prevArgs = res;
        _this.status = 'resolved';
      } catch (error) {
        _this.status = 'rejected';
        throw Error(error);
      }
    }
  }

  private injectorReject = (reject) => (...args) => {
    this.status = 'rejected';
    reject(...args);
  }

  private injectorTask = (task) => (resolve, reject) => {
    this.status = 'pending'
    const newResolve = this.injectorResolve(resolve);
    const newReject = this.injectorReject(reject);
    task(newResolve, newReject);
  }

  static resolve() { }

  static reject() { }

  static race() { }

  static all() { }

  public then(resolve: Resolve, reject: Reject = defaultReject) {
    this.task(resolve, reject);
    return this
  }

  public catch() { }

  public finally() { }
}

var b = new IPromise((resolve, reject) => {
  resolve('123');
})
b.then(res => {
  console.log(res);
  return 'next'
}).then(res => {
  console.log(res);
});

export default IPromise
