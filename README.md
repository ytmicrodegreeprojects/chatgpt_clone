# Next.js AI App

A modern, full-stack Next.js application that demonstrates AI-powered text generation and streaming capabilities using OpenAI's GPT models. This project showcases two different approaches to AI integration: traditional completion requests and real-time streaming responses.

## 🚀 Features

- **AI Text Completion**: Generate complete text responses using OpenAI's GPT models
- **Real-time Streaming**: Experience live text streaming as responses are generated
- **Interactive Chat Interfaces**: User-friendly chat UIs for both completion modes
- **TypeScript Support**: Fully typed codebase for better development experience
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Dark Mode Support**: Built-in light and dark theme support
- **Error Handling**: Robust error handling and user feedback

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Vercel AI SDK with OpenAI
- **Validation**: Zod for schema validation
- **UI Components**: React 19 with custom components

## 📋 Prerequisites

- Node.js 18+ and npm
- OpenAI API key (get one from [OpenAI Platform](https://platform.openai.com/api-keys))

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nextjs-ai-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Completion Mode
Visit `/ui/completion` to access the text completion interface. Enter a prompt and receive a complete AI-generated response.

### Streaming Mode
Visit `/ui/stream` to experience real-time text streaming. Watch as the AI response appears character by character.

## 🔌 API Endpoints

### POST `/api/completion`
Generates complete text responses using OpenAI's GPT model.

**Request Body:**
```json
{
  "prompt": "Your prompt here"
}
```

**Response:**
```json
{
  "text": "Generated response text"
}
```

### POST `/api/stream`
Streams text responses in real-time using OpenAI's GPT model.

**Request Body:**
```json
{
  "prompt": "Your prompt here"
}
```

**Response:** Server-sent events stream with incremental text updates.

## 🏗️ Project Structure

```
nextjs-ai-app/
├── app/
│   ├── api/
│   │   ├── completion/
│   │   │   └── route.ts      # Completion API endpoint
│   │   └── stream/
│   │       └── route.ts      # Streaming API endpoint
│   ├── ui/
│   │   ├── completion/
│   │   │   └── page.tsx      # Completion UI page
│   │   └── stream/
│   │       └── page.tsx      # Streaming UI page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── public/                   # Static assets
├── package.json
├── tailwind.config.js
├── next.config.ts
└── tsconfig.json
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your `OPENAI_API_KEY` to Vercel's environment variables
4. Deploy!

### Other Platforms
This app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Render
- Self-hosted with Docker

## 🤝 Contributing (Optional)

This is a course project, so contributions are not required. Contributors cannot directly edit the main source code. Instead:

1. Fork the repository (creates your own copy)
2. Create a feature branch in your fork (`git checkout -b feature/your-feature`)
3. Make your changes and commit them (`git commit -m 'Add your feature'`)
4. Push to your fork (`git push origin feature/your-feature`)
5. Open a Pull Request from your fork to propose changes to the main repository

As the maintainer, I'll review and decide whether to merge any proposed changes. Feel free to fork and experiment with the code for your own learning!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Vercel AI SDK](https://vercel.com/docs/ai) - AI integration made easy
- [OpenAI](https://openai.com/) - AI models and API
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

---

Built using Next.js and AI
