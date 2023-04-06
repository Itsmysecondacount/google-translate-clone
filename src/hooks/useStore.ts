import { useReducer } from 'react';
import { Action, FromLanguage, Language, type State } from '../typex';
import { AUTO_LANGUAGE } from '../constats';

const initialState: State = {
	fromLanguage: 'auto',
	toLanguage: 'en',
	formText: '',
	result: '',
	loading: false,
};

const reducer = (state: State, action: Action) => {
	const { type } = action;
	let loading = false;

	switch (type) {
		case 'INTERCHANGE_LANGUAGES':
			if (state.fromLanguage === AUTO_LANGUAGE) return state;
			loading = state.formText != '';
			return {
				...state,
				formText: state.result,
				result: '',
				fromLanguage: state.toLanguage,
				toLanguage: state.fromLanguage,
				loading,
			};
		case 'SET_FROM_LANGUAGE':
			if (state.fromLanguage === action.payload) return state;
			loading = state.formText != '';

			return {
				...state,
				fromLanguage: action.payload,
				loading,
			};

		case 'SET_TO_LANGUAGE':
			if (state.fromLanguage === action.payload) return state;
			loading = state.formText != '';

			return {
				...state,
				toLanguage: action.payload,
				result: '',
				loading,
			};

		case 'SET_FROM_TEXT':
			loading = action.payload != '';

			return {
				...state,
				loading: true,
				formText: action.payload,
				result: '',
			};

		case 'SET_RESULT':
			return {
				...state,
				loading: true,
				result: action.payload,
			};

		default:
			return state;
	}
};

export function useStore() {
	const [{ fromLanguage, toLanguage, formText, result, loading }, dispatch] = useReducer(
		reducer,
		initialState,
	);

	const interchangeLanguages = () => dispatch({ type: 'INTERCHANGE_LANGUAGES' });

	const setFromLanguage = (payload: FromLanguage) =>
		dispatch({ type: 'SET_FROM_LANGUAGE', payload });

	const setToLanguage = (payload: Language) =>
		dispatch({ type: 'SET_TO_LANGUAGE', payload });

	const setFromText = (payload: string) => dispatch({ type: 'SET_FROM_TEXT', payload });

	const setResult = (payload: string) => dispatch({ type: 'SET_RESULT', payload });

	return {
		fromLanguage,
		toLanguage,
		formText,
		result,
		loading,
		interchangeLanguages,
		setFromLanguage,
		setFromText,
		setToLanguage,
		setResult,
	};
}
