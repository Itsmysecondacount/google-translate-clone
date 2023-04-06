import { Form } from 'react-bootstrap';
import { SelectionType } from '../typex.d';

type Props =
	| {
			type: SelectionType;
			loading?: undefined;
			onChange: (value: string) => void;
			value: string;
	  }
	| {
			type: SelectionType;
			loading?: boolean;
			onChange: (value: string) => void;
			value: string;
	  };

const commonStyles = { border: 0, height: '200px', resize: 'none', width: '200px' };

const getPlaceHolder = ({
	type,
	loading,
}: {
	type: SelectionType;
	loading?: boolean;
}) => {
	if (type === SelectionType.From) return 'Introducir texto';
	if (loading) return 'Cargando ...';
	return 'Traducción';
};

export const TextArea = ({ type, loading, value, onChange }: Props) => {
	const styles =
		type === SelectionType.To
			? { ...commonStyles, backgroundColor: '#f5f5f5' }
			: { ...commonStyles, border: '1px solid #e9e9e9' };

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		onChange(event.target.value);
	};

	return (
		<Form.Control
			autoFocus={type === SelectionType.From}
			as="textarea"
			placeholder={getPlaceHolder({ type, loading })}
			disabled={type === SelectionType.To}
			style={styles}
			value={value}
			onChange={handleChange}
		/>
	);
};
