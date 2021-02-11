const LandingPage = ({color}) => {
  console.log({color})
  return <h1>Landing page1</h1>
}

LandingPage.getInitialProps = () => {
  console.log('I am on serverside');

  return { color: 'red' }
}

export default LandingPage;