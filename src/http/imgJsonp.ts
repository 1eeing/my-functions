interface IArgument {
  url: string
  params: {
    [key: string]: any
  }
}

const imgJsonp = ({
  url,
  params,
}: IArgument) => {
  const img = document.createElement('img');
  const searches = Object.keys(params).map(key => `${key}=${params[key]}`);
  const finalUrl = `${url}?${searches.join('&')}`;
  img.src = finalUrl;
  document.body.appendChild(img);
  setTimeout(() => { // 一段时间后移除图片
    document.body.removeChild(img);
  }, 200);
}

export default imgJsonp;
