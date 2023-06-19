import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import cron from 'node-cron';

const app = express();
const PORT = process.env.PORT || 3001;

const DAILY_NINE_AM_CRON = '0 9 * * *';
cron.schedule(DAILY_NINE_AM_CRON, async () => {
  try {
    const { data: todos } = await axios.get(
      process.env.TODO_SERVICE_URL + '/todos/upcoming'
    );

    for (const todo of todos) {
      sendNotification(`Your task "${todo.title}" is due tomorrow.`);
    }
  } catch (error: any) {
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
