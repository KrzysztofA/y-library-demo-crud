import useFetch from "./useFetch";

const useRegistration = () => {
  const handleFetch = useFetch("https://localhost:7133/", "user/new");

  const addUser = async (
    email: string,
    username: string,
    password: string
  ): Promise<boolean> => {
    const queryObj = {
      email: `${email}`,
      username: `${username}`,
      password: `${password}`,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryObj),
    };

    let success = false;

    await handleFetch(undefined, options)
      .then((res) => {
        console.log(res);
        if (!res.ok) throw new Error(res.statusText);
        else success = true;
      })
      .catch((err) => {
        console.log(err);
      });
    return success;
  };

  return addUser;
};

export default useRegistration;
