import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Button,
} from "@react-email/components";
import { sendEmail } from "@/lib/email";
import { toast } from "sonner";


const MagicLinkEmailBody = ({ email, url }: { email: string; url: string }) => {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <style>
          {`
            * {
              font-family: 'Inter', sans-serif;
            }

            blockquote,h1,h2,h3,img,li,ol,p,ul {
              margin-top: 0;
              margin-bottom: 0;
            }

            @media only screen and (max-width: 600px) {
              h2 {
                font-size: 24px !important;
                line-height: 32px !important;
              }
              p, a {
                font-size: 14px !important;
                line-height: 22px !important;
              }
              button {
                font-size: 18px !important;
                padding: 10px 20px !important;
                letter-spacing: 4px !important;
              }
              .container {
                padding: 0.5rem 1rem !important;
              }
            }
          `}
        </style>
      </Head>
      <Body
        style={{
          margin: 0,
          padding: "30px 0",
          backgroundColor: "#ffffff",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <Container
          className="container"
          style={{
            maxWidth: "600px",
            width: "100%",
            padding: "0.5rem",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <Text
            style={{
              fontSize: "14px",
              lineHeight: "24px",
              margin: "20px 0",
              textAlign: "left",
              color: "#374151",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            To continue with your email on Startstack click on the button below.
          </Text>
          <Link
            style={{
              lineHeight: "100%",
              textDecoration: "none",
              color: "#ffffff",
              backgroundColor: "#141313",
              borderColor: "#ffffff",
              padding: "12px 34px",
              borderWidth: "2px",
              borderStyle: "solid",
              fontSize: "14px",
              fontWeight: 550,
              borderRadius: "100px",
              fontFamily: "'Inter', sans-serif",
              cursor: "pointer",
            }}
            href={url}
          >
            Continue with Magic link
          </Link>
          <Text
            style={{
              fontSize: "12px",
              lineHeight: "24px",
              margin: "18px 0",
              color: "#64748B",
              textAlign: "left",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            This message was sent to{" "}
            <Link
              href={`mailto:${email}`}
              style={{
                color: "#111827",
                textDecoration: "underline",
                fontWeight: 500,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {email}
            </Link>{" "}
            because a login/signup attempt was made using this email. If this
            wasn't you, you can safely ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export async function sendMagicLink(email: string, url: string) {
  try {
    const res = await sendEmail(
      email,
      "Continue with your Email",
      <>
        <MagicLinkEmailBody email={email} url={url} />
      </>,
    );
    return res;
  } catch (error) {
    return error;
  }
}
