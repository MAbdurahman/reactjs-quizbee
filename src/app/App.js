import React from 'react';
import Header from './../components/Header';

import { useGlobalContext } from './../utils/context';
import SetUpForm from './../components/SetUpForm';
import Modal from './../components/Modal';
import Loader from './../components/Loader';

function App() {
	//**************** variables ****************//
	const {
		waiting,
		loading,
		questions,
		index,
		correct,
		nextQuestion,
		checkAnswer,
	} = useGlobalContext();

	if (waiting) {
		return (
			<Header>
				<SetUpForm />
			</Header>
		);
	}
	if (loading) {
		return (
			<Header>
				<Loader />
			</Header>
		);
	}

	const { question, incorrect_answers, correct_answer } = questions[index];
	/* const answers = [ ...incorrect_answers, correct_answer] */
	let answers = [...incorrect_answers];
	const tempIndex = Math.floor(Math.random() * 4);
	if (tempIndex === 3) {
		answers.push(correct_answer);
	} else {
		answers.push(answers[tempIndex]);
		answers[tempIndex] = correct_answer;
	}
	return (
		<Header>
			<main id='main-container' className='container'>
				<Modal />
				<section className='quiz'>
					<p className='correct-answers'>
						correct answers: {correct}/{index}
					</p>
					<article className='wrapper'>
						<h3 dangerouslySetInnerHTML={{ __html: question }} />
						<div className='btn-container'>
							{answers.map((answer, index) => {
								return (
									<button
										key={index}
										className='answer-btn'
										onClick={() =>
											checkAnswer(correct_answer === answer)
										}
										dangerouslySetInnerHTML={{ __html: answer }}
									/>
								);
							})}
						</div>
					</article>
					<button className='next-question' onClick={nextQuestion}>
						next question
					</button>
				</section>
			</main>
		</Header>
	);
}

export default App;
