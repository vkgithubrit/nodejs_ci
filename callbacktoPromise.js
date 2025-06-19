const { resolve } = require("path");

const LibraryMethodPromise=async()=>{
    return new Promise((resolve,reject)=>{
        libraryMethod((error,data)=>{
            if(error){
                reject()
            }else{
                resolve(data);
            }
        })
    })
}
const libraryMethod=(callback)=>{
    setTimeout(()=>{
        callback(null,{
            message:"It ran  Properly"
        });
    },2000)
}

(async()=>{
    const res=await LibraryMethodPromise()
    console.log(res);

})()