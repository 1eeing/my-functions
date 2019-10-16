interface IArgument {
  url: string
  params: {
    [key: string]: any
  }
  callback: string
}

const jsonp = ({ url, params, callback }: IArgument) => new Promise((resolve, reject) => {
  const script = document.createElement('script');
  window[callback] = function (data) {
    resolve(data);
    document.body.removeChild(script);
  }
  const finalParams = { ...params, callback };
  const arrs = Object.keys(finalParams).map(key => `${key}=${finalParams[key]}`);
  script.src = `${url}?${arrs.join('&')}`;
  document.body.appendChild(script);
})

export default jsonp;
