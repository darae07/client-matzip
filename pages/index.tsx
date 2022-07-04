import type { NextPage } from 'next'

const Home: NextPage = () => {
  return <div></div>
}

export default Home

export function getServerSideProps() {
  return {
    redirect: {
      destination: '/home',
    },
  }
}
