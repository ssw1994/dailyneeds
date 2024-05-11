import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../Services";
import Card from "../Card/Card";
export default function VerifyEmail() {
  const { username } = useParams();
  const [isEmailVerified, setEmailVerified] = useState(null);
  useEffect(() => {
    const payload = { username };

    http
      .verifyEmail(payload)
      .then((response) => {
        setEmailVerified(true);
      })
      .catch((error) => {
        console.error(error);
        setEmailVerified(false);
      });
  }, []);

  if (isEmailVerified === null) {
    return (
      <Card className="flex-row-center-items">
        <h1>Verify Email Please Wa</h1>
      </Card>
    );
  }

  if (isEmailVerified) {
    return (
      <Card className="flex-row-center-items">
        <h1>Email Verification Completed Successfully</h1>
      </Card>
    );
  }

  if (isEmailVerified === false) {
    return (
      <Card className="flex-row-center-items">
        <h1>Error in Email Verification</h1>
      </Card>
    );
  }
}
