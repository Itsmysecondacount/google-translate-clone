import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai';
import { FromLanguage, Language } from '../typex';
import { SUPPORTED_LANGUAGES } from '../constats';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const configuration = new Configuration({ apiKey });
const openai = new OpenAIApi(configuration);

export async function translate({
	fromLanguage,
	toLanguage,
	text,
}: {
	fromLanguage: FromLanguage;
	toLanguage: Language;
	text: string;
}) {
	const messages = [
		{
			role: ChatCompletionRequestMessageRoleEnum.System,
			content:
				'You are a AI that translates text. You receive a text from the user. Do not answer, just translate the text. The original language is sorrounded by `{{` and `}}`. you can also recive {{auto}} which means that you have detect the language. The language you translate to is sorrounded by `[[` and `]]`.',
		},
		{
			role: ChatCompletionRequestMessageRoleEnum.User,
			content: 'Hola mundo {{Español}} [[English]]',
		},
		{
			role: ChatCompletionRequestMessageRoleEnum.Assistant,
			content: 'Hello Word',
		},
		{
			role: ChatCompletionRequestMessageRoleEnum.User,
			content: 'How are you? {{auto}} [[Deutsch]]',
		},
		{
			role: ChatCompletionRequestMessageRoleEnum.Assistant,
			content: 'Wie geht es dir?',
		},
	];
	const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage];
	const toCode = SUPPORTED_LANGUAGES[toLanguage];

	const completion = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages: [
			...messages,
			{
				role: ChatCompletionRequestMessageRoleEnum.User,
				content: `${text} {{${fromCode}}} [[${toCode}]]`,
			},
		],
	});

	return completion.data.choices[0]?.message?.content;
}
