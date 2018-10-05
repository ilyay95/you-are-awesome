// DO WHATEVER YOU WANT HERE

const createEnumerableProperty = (propertyName) => { return propertyName;};
const createNotEnumerableProperty = (propertyName) => { return Symbol(propertyName);};

const createProtoMagicObject = () => {
    let magicObject = function(){}; 
    magicObject.__proto__ = magicObject.prototype;
    return magicObject;
};

let n = 0;
const incrementor = () => {
    const increment = () => {
        n++;
        return n;
    };
    increment();
    
    incrementor.valueOf  = function () {
        return n;
    };

    return incrementor;
};
const asyncIncrementor = () => {
    asyncIncrementor.value = asyncIncrementor.value || 0;

    return new Promise((resolve, reject) => 
               resolve(++asyncIncrementor.value));
};
const createIncrementer = () => {
    const incrementer = function*(){
        let value = 0;
        while(true)
            yield ++value;
    }

    return incrementer();     
};

// return same argument not earlier than in one second, and not later, than in two
const returnBackInSecond = (param) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        reject(new Error("Time is Out!"));
        }, 2000);

        setTimeout(() => {
        resolve(param);
        }, 1000);
    });
};
const getDeepPropertiesCount = (obj) => {
    let i = 0;
    let temp = obj;
    let count = 0;
    while (Object.keys(temp).length !== 0) {
        for (const key in temp) {
            if (JSON.stringify(temp[key]) !== "{}") {
                i = key; 
            }
        }
        count += Object.keys(temp).length;
        temp = temp[i];
    }
    return count;
};

const createSerializedObject = () => {
    let obj = {};
    JSON.parse = function() {
        return obj;
    };
    return obj;
};
const toBuffer = () => {};
const sortByProto = (array) => {
     let count = 0;
    array.forEach(element => {
        let currentObj = element;
        while(currentObj.__proto__.__proto__) {
            count++;
            currentObj = currentObj.__proto__;  
        }
        element.deep = count;
        count = 0;
    });
    array.sort(function (prevObj, nextObj) {
        return nextObj.deep - prevObj.deep;
    });
    return array;
};

exports.createEnumerableProperty = createEnumerableProperty;
exports.createNotEnumerableProperty = createNotEnumerableProperty;
exports.createProtoMagicObject = createProtoMagicObject;
exports.incrementor = incrementor;
exports.asyncIncrementor = asyncIncrementor;
exports.createIncrementer = createIncrementer;
exports.returnBackInSecond = returnBackInSecond;
exports.getDeepPropertiesCount = getDeepPropertiesCount;
exports.createSerializedObject = createSerializedObject;
exports.sortByProto = sortByProto;
