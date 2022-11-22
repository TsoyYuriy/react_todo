import React from 'react';
import './Task.css';

const Task = (props) => {
	return ( 
		<div className="task">
			<input 
				type="checkbox" 
				onChange={props.handleCheck}
				checked={props.checked}
			/>
			<p className={`task__text ${props.className}`}>{props.taskText}</p>
			<button className="task__btn-delete" onClick={props.btnDeleteTask}></button>
		</div>
	);
}
 
export default Task;