import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import routes from './routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', routes)

export default app;

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});