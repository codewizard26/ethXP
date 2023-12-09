import { useEffect, useState } from "react";
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { subscribe } from "@pushprotocol/restapi/src/lib/channels";

const buttonStyles = {
  backgroundColor: "#3498db",
  color: "#ffffff",
  border: "none",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
};

export default function PushMessage({ _signer, _clicked }) {
  const [user, setUser] = useState(null);
  const signer = _signer;

  const initializePush = async () => {
    const user = await PushAPI.initialize(signer, {
      env: CONSTANTS.ENV.STAGING,
    });
  };

  const pushChannelAddress = "0x4fE333470b78C5896178780aa9483bc8F6085418";

  const subscribeToChannel = async () => {
    await user.notification.subscribe(`eip155:11155111:${pushChannelAddress}`);
  };

  const sendNotification = async () => {
    const targetNotification = await user.channel.send([signer.address], {
      notification: {
        title: "test",
        body: "This is a test notification.",
      },
    });
  };

  useEffect(() => {
    initializePush();
  }, [_clicked]);

  return (
    <div>
      <div className="subscribe">
        <button onClick={subscribeToChannel} style={buttonStyles}>
          Click here to subscribe!
        </button>
      </div>
      <div className="sendMessage">
        <button onClick={sendNotification} style={buttonStyles}>
          Click here to send notification
        </button>
      </div>
    </div>
  );
}
