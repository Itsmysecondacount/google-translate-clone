import { Form } from 'react-bootstrap';
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constats';
import React from 'react';
import { FromLanguage, SelectionType, type Language } from '../typex.d';

type Props =
	| {
			type: SelectionType.From;
			value: FromLanguage;
			onChange: (language: FromLanguage) => void;
	  }
	| { type: SelectionType.To; value: Language; onChange: (language: Language) => void };

export const LanguageSelector = ({ onChange, type, value }: Props) => {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		onChange(event.target.value as Language);
	};

	return (
		<Form.Select aria-label="Selecciona el idioma" onChange={handleChange} value={value}>
			{type === SelectionType.From && (
				<option value={AUTO_LANGUAGE}>Detectar idioma</option>
			)}
			{Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
				<option key={key} value={key}>
					{literal}
				</option>
			))}
		</Form.Select>
	);
};
