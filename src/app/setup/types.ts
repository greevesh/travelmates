export interface MessageProps {
  text: string;
}

export interface NextButtonProps {
  incrementStep: () => void;
}

export interface PreviousButtonProps {
  decrementStep: () => void;
}
