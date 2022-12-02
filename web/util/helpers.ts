

export const getMediaDevices = async (): Promise<MediaDeviceInfo[]> => {
  if(navigator.mediaDevices) {
    const items = await navigator.mediaDevices.enumerateDevices()
    return items.filter(device => device.kind === 'videoinput')
  } else {
    return []
  }
}

export interface Scores {
  none: number;
  paper: number;
  rock: number;
  scissors: number;
}

export const OUTCOMES =  [
  'None',
  'Paper',
  'Rock',
  'Scissors'
]

export interface Prediction {
  time: number;
  prediction: string;
  scores: Scores;
  timestamp: string;
  model_update: string;
  message: string;
}
