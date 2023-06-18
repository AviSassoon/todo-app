import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import cron from 'node-cron';

const app = express();
const PORT = process.env.PORT || 3001;

cron.schedule('0 9 * * *', async () => {
  try {
    const { data: todos } = await axios.get(
      process.env.TODO_SERVICE_URL + '/todos/upcoming'
    );
    console.log(todos);

    for (const todo of todos) {
      sendNotification(`Your task "${todo.title}" is due tomorrow.`);
    }
  } catch (error: any) {
    console.log(error);

    console.error(`Failed to send notifications: ${error.message}`);
  }
});

app.listen(PORT, () =>
  console.log(`Notification service running on port ${PORT}`)
);

function sendNotification(message: string) {
  // implemented...
  console.log(`send notification: ${message}`);
}
