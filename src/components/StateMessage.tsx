type StateMessageProps = {
  message: string;
};

export const StateMessage = ({ message }: StateMessageProps) => {
  return <div className="text-center py-8 text-gray-500">{message}</div>;
};
