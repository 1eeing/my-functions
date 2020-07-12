type IPromiseTask = (resolve: OnFulfilled, reject: OnRejected) => void

type OnFulfilled = (sv: any) => void

type OnRejected = (jv: any) => void

type Status = 'pending' | 'rejected' | 'resolved'

const defaultOnRejected: OnRejected = () => { }

class IPromise {
  private status: Status
  private res: any
  private err: any
  private onFulfilled: OnFulfilled
  private onRejected: OnRejected

  constructor(
    private task: IPromiseTask
  ) {
    try {
      this.status = 'pending';
      this.task(this.resolveFn, this.rejectFn);
    } catch (error) {
      throw Error(error);
    }
  }

  private resolveFn = (res) => {
    if(this.status !== 'pending') return;
    setTimeout(() => {
      this.status = 'resolved';
      this.res = res;
      this.onFulfilled && this.onFulfilled(res);
    })
  }

  private rejectFn = (err) => {
    if(this.status !== 'pending') return;
    setTimeout(() => {
      this.status = 'rejected';
      this.err = err;
      this.onRejected && this.onRejected(err);
    })
  }

  public then(onFulfilled: OnFulfilled, onRejected: OnRejected = defaultOnRejected) {
    if(this.status === 'pending'){
      this.onFulfilled = onFulfilled;
      this.onRejected = onRejected;
    }else if(this.status === 'resolved'){
      onFulfilled(this.res);
    }else if(this.status === 'rejected'){
      onRejected(this.err);
    }
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
