/*eslint-disable */

chrome.runtime.onInstalled.addListener(() => {
  const arr = [];
  chrome.storage.local.set({'ids': JSON.stringify(arr)});

  const makeid = (length) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  const id = makeid(8);
  chrome.storage.local.set({'extensionId': id});
})
