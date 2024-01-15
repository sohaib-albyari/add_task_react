import Operation from "./Operation";
function TaskData(props) {
    return (
        <>
            <td>{props.task.id}</td>
            <td>{props.task.name}</td>
            <td>{props.task.department}</td>
            <td>{props.task.employee}</td>
            <td>{props.task.startdateTime[0]}  {props.task.startdateTime[1]}</td>
            <td>{props.task.enddateTime[0]}  {props.task.enddateTime[1]}</td>
            <td>{props.task.check}</td>
            <Operation task={props.task} />
        </>
    )
}
export default TaskData;

