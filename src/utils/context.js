import axios from 'axios';
import React, { useState, useContext } from 'react';

const table = {
   animals: 27,
	general: 9,
	history: 23,
	politics: 24,
	sports: 21,
};

const API_ENDPOINT = 'https://opentdb.com/api.php?';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	//**************** variables ****************//
	const [waiting, setWaiting] = useState(true);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [questions, setQuestions] = useState([]);
	const [index, setIndex] = useState(0);
	const [correct, setCorrect] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [quiz, setQuiz] = useState({
		amount: 10,
		category: 'general',
		difficulty: 'easy',
	});

	//**************** functions ****************//
	const fetchQuestions = async url => {
		setLoading(true);
		setWaiting(false);

		const response = await axios(url).catch(err => console.log(err));
		console.log(response);
		if (response) {
			const data = response.data.results;
			if (data.length > 0) {
				setQuestions(data);
				setLoading(false);
				setWaiting(false);
				setError(false);
			} else {
				setWaiting(true);
				setError(true);
			}
		} else {
			setWaiting(true);
		}
	};

	const nextQuestion = () => {
		setIndex(currentIndex => {
			const index = currentIndex + 1;
			if (index > questions.length - 1) {
				openModal();
				return 0;
			} else {
				return index;
			}
		});
	};

	const checkAnswer = value => {
		if (value) {
			setCorrect(currentState => currentState + 1);
		}
		nextQuestion();
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setWaiting(true);
		setCorrect(0);
		setIsModalOpen(false);
	};

	const handleChange = e => {
		const name = e.target.name;
		const value = e.target.value;
		setQuiz({ ...quiz, [name]: value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		const { amount, category, difficulty } = quiz;
		const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`;
		fetchQuestions(url);
	};
	
	return (
		<AppContext.Provider
			value={{
				waiting,
				loading,
				error,
				questions,
				index,
				correct,
				isModalOpen,
				nextQuestion,
				checkAnswer,
				closeModal,
				quiz,
				handleChange,
				handleSubmit,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

/***** make sure to use *****/
export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
