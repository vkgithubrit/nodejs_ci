// console.log("First-Line");
// getStudent(1,(student)=>{
//     console.log("Student",student);
//     getSubjects(student.id,(subject)=>{
//         console.log(subject);
//         getMarks(subject[0],(mark)=>{
//             console.log(mark);
//         });
//     });
// });
// console.log("Last-Line");


// function displaySubjects(subject){
//     console.log(subject);

//     getMarks(subject[0],displayMarks);
// }

// function displayMarks(mark){
//     console.log("Mark", mark);

// }

// Promise

// const promise=getStudent(1)

// promise
//     .then((student)=>getSubjects(student.id))
//     .then((subject)=>getMarks(subject[0]))
//     .then((mark)=>console.log(mark))
//     .catch(error=>console.log(error));

// Async await
async function displayData(){
    try{
        const student=await getStudent(1)
        const subject=await getSubjects(student.id)
        const mark=await getMarks(subject[0])
        console.log("Mark",mark);

    }catch(error){
        console.log(error);
    }
    
}

displayData()


function getStudent(id){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("Getting data from Database");
            resolve({name:'Vivek',id:id})
        
        },2000);
    })
    
}

function getSubjects(id){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("Getting subject of student",id)
            resolve(["Math","Science","English"]);
        },2000);
    })
    
}
function getMarks(subject){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("Getting Marks of ",subject)
            resolve(80);
        },2000);
    })
    
}


