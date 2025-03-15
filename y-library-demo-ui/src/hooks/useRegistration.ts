import useFetch from "./useFetch";

const useRegistration = () => {
  const handleFetch = useFetch("https://localhost:7133/", "user");

  const register = (username: string, password: string) => {
    console.log(username, password);
  };

  return register;
};

export default useRegistration;
