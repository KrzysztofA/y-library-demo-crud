import useFetch from "./useFetch";

const useRegistration = () => {
  const handleFetch = useFetch("https://localhost:7133/", "user");

  const register = (
    email: string,
    username: string,
    password: string
  ): boolean => {
    console.log(email, username, password);
    return true;
  };

  return register;
};

export default useRegistration;
