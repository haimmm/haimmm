//standard fetch function
export const getData = async url =>{
    const response = await fetch(url);
    const data = await response.json();
    if(response.ok)
        return data;
    else
        throw new Error(`The request failed: ${data}`);
}

//@returns element by ID or error if not found.
export const getElement = id =>{
    const element = document.getElementById(id);
    if(element)
        return element;
    else
        throw new Error(`Theere is no such element with id "${id}"`);
}

//@returns array of elements, good for deconstruction
export const getElements =  (...args) =>{
    const elements = []
    for(const id of args){
        const element = document.getElementById(id);
        if(element)
            elements.push(element)
        else
            throw new Error(`Theere is no such element with id "${id}"`);
    }
    return elements;
}

//@returns string of num with 2 decimal slots and '+' if positive. 
export const prettyFloat = num =>{
    num = (Math.round(num * 100) / 100).toFixed(2);
    return (num > 0 ? '+' :"") + num ;
}


export const debounce = (fn, wait) => {
    let timeoutId;
    return function(){
      const args = arguments;  
      if(timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(function(){
        timeoutId = null;
        fn.apply(null, args);
      }, wait);
    }
}

export const clearHTML = element => element.innerHTML = "";

export const waitForLoad = element => {
    return new Promise((resolve, reject) => {
        element.addEventListener("load", () => {
            resolve(true);
        });
        setTimeout(() => {resolve(false)}, 2500);
    });
}