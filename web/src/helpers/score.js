import dayjs from 'dayjs';

export function calculateScore(data) {
  let score = 0;
  switch(data.severity) {
    case 'mild':
      score += 10;
      break;
    case 'moderate':
      score += 50;
      break;
    case 'critical':
      score += 10000;
      break;
    default:
      break;
  }
  
  // Get +20 per hour spent at hospital
  const diff = dayjs().diff(dayjs(data.timestamp), 'hour');
  score += 20 * diff;

  return score;
}