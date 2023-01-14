import axios from "axios";
import { useState, createContext, useContext, useEffect } from "react";
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [toDoList, setToDoList] = useState([]);
    const url = "http://localhost:3000/tasks";
    let token = localStorage.getItem("api_token");
    useEffect(() => {
        async function fetchData() {
            // console.log("response");
            const response = await axios.get(url);
            const data = response.data;
            setToDoList(data)
            console.log(toDoList)

        }
        fetchData();
    }, []);
    useEffect(() => {
        console.log(toDoList);
    }, [toDoList]);
    // const [pass, setPass] = useState(null) ;
    const handleDelete = (id) => {
        console.log(id)
        let mapped = toDoList.filter(task => task.id !== id);
        let oldData = [...toDoList];
        setToDoList(mapped);
        editTasks();
        async function editTasks() {
            try {
                await axios.delete(`${url}/${id}?api_token=${token}`);

            }
            catch (error) {
                alert(error.message);
                setToDoList(oldData)

            }

        }

    }
    const handleDeleteSection = () => {
        deleteTasks();
        async function deleteTasks() {
            try {
                setToDoList([]);
                for (const task of toDoList) {
                    console.log(task)
                    await axios.delete(`${url}/${task.id}?api_token=${token}`)
                }
                return true

            }
            catch (error) {
                alert(error.message);
                return false
            }

        }

    }
    const addNewTask = (task) => {
        let oldData = [...toDoList];
        let copyTasks = [...toDoList];
        let newTask = { task: task, id: Math.ceil((Math.random() * 100)) };
        copyTasks = [...copyTasks, newTask];
        addTask();
        async function addTask() {
            try {
                setToDoList(copyTasks);
                const response = await axios.post(`${url}?api_token=${token}`, newTask);
                return response;
            }
            catch (error) {
                alert(error.message)
                setToDoList(oldData);
            }

        }
    }
    const login = (user) => {
        setUser(user);
        // setPass(pass);
    }
    const logout = () => {
        setUser(null);
        // setPass(null);
    }
    return <AuthContext.Provider value={{ user, toDoList, addNewTask, handleDelete, handleDeleteSection, login, logout }}>{children}</AuthContext.Provider>

}
export const useAuth = () => {

    return useContext(AuthContext)
}
