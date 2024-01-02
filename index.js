import OpenAI from 'openai';

export default {
	async fetch(request, env, ctx) {
		const openai = new OpenAI({
			apiKey: env.OPENAI_API_KEY,
			baseURL: ' ', // Provide your own AI Gateway endpoint
		});

		// Define the CORS headers
		const headers = new Headers({
			'Access-Control-Allow-Origin': ' ', // Replace with your frontend URL
			'Access-Control-Allow-Methods': 'POST',
			'Access-Control-Allow-Headers': 'Content-Type',
		});

		// Check if the request method is OPTIONS (preflight request)
		if (request.method === 'OPTIONS') {
			return new Response(null, { headers });
		}

		try {
			const requestBody = await request.json(); // Parse the request body as JSON

			// Extract userQuery from the request body
			const userQuery = requestBody.userQuery;

			if (!userQuery) {
				return new Response(JSON.stringify({ error: 'userQuery is missing in the request body' }), { status: 400 });
			}

			const assistant = await openai.beta.assistants.retrieve(' '); // Provide your assistant key

			const thread = await openai.beta.threads.create();

			const message = await openai.beta.threads.messages.create(thread.id, { role: 'user', content: userQuery });

			const run = await openai.beta.threads.runs.create(thread.id, { assistant_id: assistant.id });

			// Function to check run status and retrieve messages
			const checkStatusAndPrintMessages = async (threadId, runId) => {
				let runStatus;
				let messages;

				do {
					runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
					if (runStatus.status === 'completed') {
						messages = await openai.beta.threads.messages.list(threadId);
					} else {
						await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
					}
				} while (runStatus.status !== 'completed');

				let assistantResponse = '';

				// Find the Assistant's response
				for (const msg of messages.data) {
					if (msg.role === 'assistant') {
						const content = msg.content[0].text.value;
						assistantResponse += content + '\n';
					}
				}

				// Return the response with the Assistant's message
				return new Response(assistantResponse, { headers });
			};

			// Initial check and possibly waiting for completion
			const response = await checkStatusAndPrintMessages(thread.id, run.id);

			// Return the final response
			return response;
		} catch (e) {
			// Handle any errors that may occur
			return new Response(JSON.stringify({ error: e.message }), { status: 500, headers });
		}
	},
};
