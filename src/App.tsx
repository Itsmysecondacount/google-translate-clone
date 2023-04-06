import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useDebounce } from './hooks/useDebounce';
import { useStore } from './hooks/useStore';
import { Container, Row, Col, Button, Form, Stack } from 'react-bootstrap';
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constats';
import { ArrowIcon, CopyIcon, SpeackerIcon } from './components/Icons';
import { LanguageSelector } from './components/LanguageSelector';
import { SelectionType } from './typex.d';
import { TextArea } from './components/TextArea';
import { useEffect } from 'react';
import { translate } from './services/translate';

function App() {
	const {
		loading,
		fromLanguage,
		formText,
		toLanguage,
		result,
		setFromLanguage,
		setToLanguage,
		setFromText,
		setResult,
		interchangeLanguages,
	} = useStore();

	const debouncedFromText = useDebounce(formText);

	useEffect(() => {
		if (debouncedFromText === '') return;
		translate({ fromLanguage, toLanguage, text: debouncedFromText })
			.then((result) => {
				if (result === null || result === undefined) return;
				setResult(result);
			})
			.catch((e) => {
				console.log(e);
				setResult('Error');
			});
	}, [debouncedFromText, fromLanguage, toLanguage]);

	const handleClickBoard = () => {
		navigator.clipboard.writeText(result).catch(() => {});
	};
	const handleSpeack = () => {
		const utterance = new SpeechSynthesisUtterance(result);
		utterance.lang = VOICE_FOR_LANGUAGE[toLanguage];
		utterance.rate = 0.8;
		speechSynthesis.speak(utterance);
	};

	return (
		<Container fluid>
			<h1>Google Translate Clone</h1>
			<Row>
				<Col>
					<Stack gap={2}>
						<LanguageSelector
							onChange={setFromLanguage}
							type={SelectionType.From}
							value={fromLanguage}
						/>
						<TextArea
							loading={loading}
							type={SelectionType.From}
							value={formText}
							onChange={setFromText}
						/>
					</Stack>
				</Col>
				<Col>
					<Button
						variant="link"
						disabled={fromLanguage === AUTO_LANGUAGE}
						onClick={interchangeLanguages}
					>
						<ArrowIcon />
					</Button>
				</Col>
				<Col>
					<Stack gap={2}>
						<LanguageSelector
							onChange={setToLanguage}
							value={toLanguage}
							type={SelectionType.To}
						/>
						<div style={{ position: 'relative' }}>
							<TextArea
								loading={loading}
								type={SelectionType.To}
								value={result}
								onChange={setResult}
							/>
							<div
								style={{
									display: 'flex',
									justifyContent: 'flex-start',
									position: 'absolute',
									left: 0,
									bottom: 0,
								}}
							>
								<Button variant="link" onClick={handleClickBoard}>
									<CopyIcon />
								</Button>
								<Button variant="link" onClick={handleSpeack}>
									<SpeackerIcon />
								</Button>
							</div>
						</div>
					</Stack>
				</Col>
			</Row>
		</Container>
	);
}

export default App;
