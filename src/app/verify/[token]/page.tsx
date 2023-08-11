"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

function VerificationPage({ params }: any) {
  const router = useRouter();
  const token = params.token;

  const [verificationStatus, setVerificationStatus] = useState("Verifying...");

  useEffect(() => {
    if (token) {
      axios
        .post("/api/verify/", { token })
        .then((response) => {
          if (response.data.success) {
            setVerificationStatus("Verification Successful");
          } else {
            setVerificationStatus("Verification Failed");
          }
        })
        .catch((error) => {
          console.error(error);
          setVerificationStatus("Verification Failed");
        });
    }
  }, [token]);

  return (
    <div>
      <p>{verificationStatus}</p>
    </div>
  );
}

export default VerificationPage;
