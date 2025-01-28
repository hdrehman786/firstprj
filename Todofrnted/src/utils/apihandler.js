import axios from 'axios';

const baseurl = 'http://localhost:3000';

export const getTodos = async (setTodo) => {
    try {
        await axios.get(`${baseurl}/todo/get`).then((response) => {
            setTodo(response.data);
        });
    } catch (err) {
        console.log('Error', err);
    }
}

export const addTodo = async (text, settext, setTodo) => {
    try {
        await axios.post(`${baseurl}/todo/post`, { text })
            .then((response) => {
                settext('');
                getTodos(setTodo);
            });
    } catch (err) {
        console.log('Error', err);
    }
}

export const updateTodo = async  (todoId, text, settext, setTodo, setisupdating) => {
    try {
        await axios.put(`${baseurl}/todo/${todoId}`,{text})
        .then((response) => {
            settext('');
            getTodos(setTodo);
            setisupdating(false);

        })
    }catch (err){
        console.log('Error', err)
    }
}



export const deletTodo = async  (todoId,setTodo) => {
    try {
        await axios.delete(`${baseurl}/todo/${todoId}`)
        .then((response) => {
            getTodos(setTodo)
        })
    }catch (err){
        console.log('Error', err)
    }
}

