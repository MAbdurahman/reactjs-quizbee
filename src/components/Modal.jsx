import React from 'react';
import { useGlobalContext } from './../utils/context';

export default function Modal() {
	const { isModalOpen, closeModal, correct, questions } = useGlobalContext();
   const score = ((correct / questions.length) * 100).toFixed(0)
	return (
		<div
			className={`${
				isModalOpen ? 'modal-container isOpen' : 'modal-container'
			}`}
		>
			<div className='modal-content'>
				<h3>{(score >= 70) ? 'congrats' : 'try harder next time'}</h3>
				<p>
					You answered {((correct / questions.length) * 100).toFixed(0)}%
					of questions correctly
				</p>
				<button className='close-btn' onClick={closeModal}>
					play again
				</button>
			</div>
		</div>
	);
}
