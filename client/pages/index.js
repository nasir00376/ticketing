import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  console.log({ currentUser });

  return currentUser ? <h1>You're signed In</h1> : <h1>You're not signed In</h1>;
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  if (typeof window === "undefined") return { currentUser: null };
  const { data } = await client.get("/api/users/currentuser");

  return data;
};

export default LandingPage;
