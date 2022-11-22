import React from 'react';
import './AddTask.css'

const AddTask = (props) => {
	return ( 
		<div className="task-form">
			<input 
				className='task-form__input' 
				onChange={props.onChange} 
				value={props.value}
				type="text" 
				placeholder='Add new task' 
				onKeyUp={props.pressEnter}
			/>

			<button 
				className="task-form__btn" 
				onClick={props.btnAdd}>Add</button>
		</div>
	);
}

export default AddTask;