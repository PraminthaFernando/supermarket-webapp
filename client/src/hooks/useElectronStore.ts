import { useEffect } from "react";

const useElectronStore = () => {
  useEffect(() => {
    // Example: Set a value in the store
    window.electronStore.set('accessToken', 'myAccessToken');

    // Example: Get the value from the store
    const token = window.electronStore.get('accessToken');
    console.log("Access Token:", token);

    // You can also delete the token when necessary
    // window.electronStore.delete('accessToken');
  }, []);
};

export default useElectronStore;