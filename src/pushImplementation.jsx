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

export default function PushMessage({ _signer, _clicked, _signerAddress }) {
  const [user, setUser] = useState(null);
  const signer = _signer;

  const initializePush = async () => {
    const user = await PushAPI.initialize(signer, {
      env: CONSTANTS.ENV.STAGING,
    });
    console.log("user", user);
    setUser(user);
  };

  const pushChannelAddress = "0x4fE333470b78C5896178780aa9483bc8F6085418";

  const subscribeToChannel = async () => {
    const response = await user.notification.subscribe(
      `eip155:111555111:${pushChannelAddress}`
    );
    console.log("response", response);
  };

  const sendNotification = async () => {
    try {
      const sendNotifRes = await user.channel.send(
        [`eip155:111555111:0x47C30E4b5DF294c3B05625a043D7768e4E41dECc`],
        {
          notification: {
            title: "Test Noti",
            body: "This is a test notification",
          },
        }
      );
      console.log("sendNotifRes", sendNotifRes);
    } catch (err) {
      console.log("error is", err);
    }
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
      <br></br>
      <p>---------------------------------------</p>
      <br></br>
      <div className="sendMessage">
        <button onClick={sendNotification} style={buttonStyles}>
          Click here to send notification
        </button>
      </div>
    </div>
  );
}
