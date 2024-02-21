import Operation from "./Operation";
function TaskData({setTasks,task,tasks}) {
    return (
        <>
            <td>{task.id}</td>
            <td>{task.department}</td>
            <td>{task.employee}</td>
            <td>{task.name}</td>
            <td>{task.startdateTime[0]}<br/>{task.startdateTime[1]}</td>
            <td>{task.enddateTime[0]}<br/>{task.enddateTime[1]}</td>
            <td>{task.check}</td>
            <Operation setTasks={setTasks} task={task} tasks={tasks} />
        </>
    )
}
export default TaskData;

