
const Home = () => {
  const data = () => {
    const dataRes: {
      id: number;
      name: string;
      description: string;
      createdAt: string;
      updatedAt: string;
    } | null = null;
    const fecthData = async () =>await fetch("http://54.251.134.88/api/category", {
      // headers: {
      //   Authorization:
      //     "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNDU3OTE5MzJhODQzNmM0YjkwODQzNDNlNWVkMWE2Yzk5ZjY0YzI4OGJkOTdkZDA0MWNmZjA0ZDE3NDZkNTIxIiwiZW1haWwiOiIxNDU3OTE5MzJhODQzNmM0YjkwODQzNDNlNWVkMWE2Yzk5ZjY0YzI4OGJkOTdkZDA0MWNmZjA0ZDE3NDZkNTIxIiwiZXhwIjoxOTQwODM4NzcyfQ.Kx3l1AwrGmN5gnD1Hyv_YG13P4P5qWa6oXrJSCT4ZDa8bm_-Kqk_R0k1QTWybzDVXhTM1uJHpJAdWQRuLjOrtw",
      // },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
      });
    fecthData()

    return dataRes;
  };
  return (
    <>
      {data()}
    </>
  );
};

export default Home;
