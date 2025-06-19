const promise=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        // const student={id:1,name:"vivek"}
        reject(new Error("Student not found"));
        // resolve(student)
    },2000);
});

promise
    .then((res)=>console.log(res))
    .catch(error=>console.log(error));