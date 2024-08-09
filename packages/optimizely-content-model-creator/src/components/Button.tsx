export type ButtonProps = {
  /** The label text to display on the button */
  label: string;

  /** The button type, can be 'button', 'submit', or 'reset' */
  type: 'button' | 'submit' | 'reset';

  /** Optional boolean to disable the button */
  disabled?: boolean;

  /** Function to call when the button is clicked */
  onClick: () => void;
};

