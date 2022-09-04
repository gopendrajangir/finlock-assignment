import React from 'react';
import { connect } from 'react-redux';
import { setMessage } from '../actions/message';

function MessageBox({
  message,
  setMessage,
  type,
}: {
  message: string | null;
  setMessage: Function;
  type: String | null;
}) {
  if (message) {
    setTimeout(() => {
      setMessage(null, null);
    }, 5000);
  }

  return (
    <div>
      {message && (
        <div
          className={`${
            type === 'danger' ? 'bg-red-500' : 'bg-green-600'
          } text-white`}
        >
          {message}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state: {
  message: { message: string | null; type: string | null };
}) => {
  return {
    message: state.message.message,
    type: state.message.type,
  };
};

const mapActionsToProps = {
  setMessage,
};

export default connect(mapStateToProps, mapActionsToProps)(MessageBox);
