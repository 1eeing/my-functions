const typeValidate = data => {
    if(typeof data === 'string'){
        return 'string';
    }
    if(typeof data === 'number'){
        return 'number';
    }
    if(typeof data === 'boolean'){
        return 'boolean';
    }
    if(typeof data === 'undefined'){
        return 'undefined';
    }
    if(typeof data === 'symbol'){
        return 'symbol';
    }
    if(Object.prototype.toString.call(data) === '[object Array]'){
        return 'array';
    }
    if(Object.prototype.toString.call(data) === '[object Function]'){
        return 'function';
    }
    if(Object.prototype.toString.call(data) === '[object Object]'){
        return 'object';
    }
    if(Object.prototype.toString.call(data) === '[object Null]'){
        return 'null';
    }
    return false;
};

const getObj = data => {
    const str = data.toString();
    return new Promise((resolve, reject) => {
        try {
            resolve(JSON.parse(str));
        } catch (error) {
            reject(error);
        }
    });
}

const parseObjectToHtml = obj1 => {
    let res = [];

    // 处理空格
    const addEmpty = (level) => {
        let emptys = '';
        for(let i = 0; i < level; i++){
            emptys += '&nbsp;';
        }
        return emptys;
    }

    const handler = (obj, level = 2) => {
        // 遍历对象
        for(let key in obj){
            // 如果该项不是对象，则简单处理即可
            if(typeValidate(obj[key]) !== 'object'){
                res.push(`${addEmpty(level)}"${key}": ${obj[key]}`);
            }else{
                res.push(`${addEmpty(level)}"${key}": {`);
                res.push(handler(obj[key], level * 2));
                res.push(`${addEmpty(level)}}`);
            }
        }
    }
    
    res.push('{');
    res.push(handler(obj1));
    res.push('}');

    return res.join('<br>');
}

const parseJson = async data => {
    try {
        const obj = await getObj(data);
        if(typeValidate(obj) !== 'object'){
            return obj;
        }
        return parseObjectToHtml(obj);
    } catch (error) {
        throw(error);
    }
}

const a = {
    a: 1,
    b: null,
    c: [1,2,3,4],
    d: {
        q: 1,
        w: 'alal',
        e: [6262, '213', false]
    }
};
const b = JSON.stringify(a);

parseJson(b).then(res => console.log(res));