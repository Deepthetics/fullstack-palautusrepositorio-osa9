interface ErrorNotificationProps {
  message: string;
}

const ErrorNotification = (props: ErrorNotificationProps): JSX.Element => {
  return (
    <div>
      <p style={{ color: 'red' }}>{props.message}</p>
    </div>
  );
};

export default ErrorNotification;
