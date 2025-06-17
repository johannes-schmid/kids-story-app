import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

const ageGroupSettings = {
  '3-5': 'Use very short, simple sentences and friendly language.',
  '6-8': 'Keep sentences short and vocabulary simple. Introduce small adventures.',
  '9-12': 'Use richer vocabulary and more complex plots suitable for pre-teens.'
};

app.post('/generate-story', async (req, res) => {
  const { prompt, ageGroup } = req.body;
  const instruction = ageGroupSettings[ageGroup] || ageGroupSettings['3-5'];
  const systemPrompt = `You are a kids story writer. ${instruction} Write a short story split into pages. Each page should have one or two sentences and an image description.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ]
    });
    const storyText = completion.choices[0].message.content;

    // Split pages by newline
    const pages = storyText.split(/\n+/).map(line => line.trim()).filter(Boolean);

    const result = [];
    for (const page of pages) {
      const imagePrompt = `Illustration for: ${page}`;
      const imageResp = await openai.images.generate({ prompt: imagePrompt, n: 1, size: '512x512' });
      const imageUrl = imageResp.data[0].url;
      result.push({ text: page, image: imageUrl });
    }

    res.json({ pages: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate story' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
