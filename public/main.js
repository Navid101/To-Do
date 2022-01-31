//axios


//fethicng

//Selectors
const ul = document.querySelector('#ul');
const button = document.querySelector(".btn");
const input = document.querySelector("#input")
const delButton = document.querySelector("#delete")

button.addEventListener('click',(e)=>{
    e.preventDefault()
    addLi(input.value)
    postTodos(input.value)
    input.value = ""
    

})




//function to create li and append to list

const addLi = (val)=>{
    if(val.todo){
        const li = document.createElement('li')
        li.className = 'list-group-item'
        li.innerHTML = `
        <div class="container d-flex align-items-center justify-content-between">
                <h3 style="display:none">${val._id}</h3>
                <h3 class="m-0" id="todo" class="${val._id}">${val.todo}</h3>
                <button class="btn btn-danger" id="delete">X</button>
        </div>
        `
        ul.append(li)
    }else if (val){
        const li = document.createElement('li')
        li.className = 'list-group-item'
        li.innerHTML = `
        <div class="container d-flex align-items-center justify-content-between">
                <h3 style="display:none">Dummy</h3>
                <h3 class="m-0" id="todo">${val}</h3>
                <button class="btn btn-danger" id="delete">X</button>
        </div>
        `
        ul.append(li)
    }
}



//function to create li container
// const addDiv = ()=>{
//     const div = document.createElement('div')
//     div.className = "container d-flex align-items-center justify-content-between"
//     div.innerHTML = `
    
//     `
// }

ul.addEventListener('click',(e)=>{
    let store = "value";
    if(e.target.id==="delete"){
        const todoId = e.target.previousElementSibling.previousElementSibling.textContent;
        e.target.parentElement.parentElement.remove()
        deleteTodos(todoId)
    }
    if(e.target.id==="todo"){
        store = e.target.textContent
        console.log(e.target.previousElementSibling.textContent);
        e.target.innerHTML=`
        <form class="d-flex align-items-center gap-3 py-3" id="editForm">
            <input type="text" class="py-1" id="input" autocomplete="off" value="${e.target.textContent}">
            <button type="submit" class="btn btn-primary" id="edit">Edit</button>
        </form>
        `

    }
    if(e.target.id==="edit"){
        e.preventDefault()
        const todoId = e.target.parentElement.parentElement.previousElementSibling.textContent;
        const editedValue = e.target.previousElementSibling.value;
        if(todoId !=="Dummy"){
            if(editedValue){
                e.target.parentElement.parentElement.parentElement.parentElement.innerHTML=`
                <div class="container d-flex align-items-center justify-content-between" id="editContainer">
                        <h3 style="display:none">${todoId}</h3>
                        <h3 class="m-0" id="todo">${editedValue}</h3>
                        <button class="btn btn-danger" id="delete">X</button>
                </div>
                `
            }
            updateTodos(todoId,editedValue)
        }else{
            if(editedValue){
                e.target.parentElement.parentElement.parentElement.parentElement.innerHTML=`
                <div class="container d-flex align-items-center justify-content-between" id="editContainer">
                        <h3 style="display:none">Dummy</h3>
                        <h3 class="m-0" id="todo">${editedValue}</h3>
                        <button class="btn btn-danger" id="delete">X</button>
                </div>
                `
            }
            postTodos(editedValue)
        }
    }
})


const loading = ()=>{
    const h1 = document.createElement('h1');
    h1.textContent = 'loading';
    ul.append(h1);
}

// https://app-todonode.herokuapp.com/
// http://localhost:5000/
const getTodos = async()=>{
    const res = await fetch('https://app-todonode.herokuapp.com/api/todos')
    const data = await res.json()
    if(data){
        data.forEach((data)=>{
            addLi(data)
        })
    }
    
}

const postTodos = async(val)=>{
    const res = await fetch('https://app-todonode.herokuapp.com/api/todos',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({todo:val})
    })
    console.log(res.data);
}

const deleteTodos = async(id)=>{
    
    const deleteItem = await fetch(`https://app-todonode.herokuapp.com/api/todos/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    
}

const updateTodos = async(id,val)=>{
    const updateItem = await fetch(`https://app-todonode.herokuapp.com/api/todos/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({todo:val})
    })
}


getTodos()

