interface IArgument {
  url: string
  params: {
    [key: string]: any
  }
}

const jsonp = ({ url, params }: IArgument) => new Promise((resolve, reject) => {
  const script = document.createElement('script');
  const callbackName = 'jsonp_' + Date.now();
  window[callbackName] = function (data) {
    resolve(data);
    document.body.removeChild(script);
    window[callbackName] = null;
  }
  const finalParams = { ...params, callback: callbackName };
  const arrs = Object.keys(finalParams).map(key => `${key}=${finalParams[key]}`);
  script.src = `${url}?${arrs.join('&')}`;
  document.body.appendChild(script);
})

export default jsonp;
