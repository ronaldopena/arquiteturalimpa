import 'express-async-errors';
import express from 'express';
import { taskRoutes } from './presentation/routes/taskRoutes';

const app = express();

app.use(express.json());
app.use(taskRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 