# README

This is an example of creating user-interactive AI assistant in a website, using OpenAI Assistant API and Cloudflare services. You can use your own OpenAI assistant.

## Prerequisites

Before setting up your Cloudflare Assistant, you'll need the following:

- **Cloudflare Account:** You should have a Cloudflare account. If you don't have one, you can sign up [here](https://www.cloudflare.com/).

- **OpenAI API Key:** To use OpenAI's language models and assistants, you'll need an API key. If you don't have one, sign up for an OpenAI account and generate your API key.

## Getting Started

Follow these steps to set up your Cloudflare Assistant:

1. **Create Your OpenAI Assistant:**

   - Create an OpenAI Assistant and copy the provided assistant key.

2. **Deploy the Cloudflare Workers Script:**

   - Follow the instructions provided in the [Cloudflare AI Gateway documentation](https://developers.cloudflare.com/ai-gateway/tutorials/deploy-aig-worker/) to create a Cloudflare Worker script.
   - Replace the `index.js` file created during the tutorial with the script provided in this repository.

3. **Configure the Cloudflare Workers:**

   - In the Cloudflare Worker script, replace the `baseURL` with your Cloudflare AI Gateway endpoint URL.
   - Replace 'Access-Control-Allow-Origin' with your frontend URL created from pages service. You can replace it with your domain or localhost server too.
   - Replace the OpenAI assistant key in the code with the key you obtained in step 1.

4. **Upload the Frontend Code to Cloudflare Pages:**

   - Create a "pages" service in Cloudflare.
   - Upload the frontend code provided in this repository or use your own with creating a logic for workers endpoint URL.
   - In the `index.html` file, replace the workers endpoint URL with your own Cloudflare Workers endpoint.

5. **Run Your Pages:**
   - Activate your Cloudflare Pages service to make your frontend accessible.
