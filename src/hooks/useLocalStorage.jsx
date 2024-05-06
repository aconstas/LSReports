import { useState, useEffect } from "react";

export function useLocalStorage() {
  const [localStorageGrants, setLocalStorageGrants] = useState(() => {
    const grants = JSON.parse(localStorage.getItem('grants'));
    return grants || [];
  });

  useEffect(() => {
    const handleStorageUpdate = () => {
      const grants = JSON.parse(localStorage.getItem("grants"));
      setLocalStorageGrants(grants);
    };

    window.addEventListener("storageUpdate", handleStorageUpdate);

    return () => {
      window.removeEventListener("storageUpdate", handleStorageUpdate);
    };
  }, []);

  const setLocalStorage = async (inputGrant) => {
    if (localStorageGrants && localStorageGrants.includes(inputGrant)) {
      throw new Error("Grant already exists.");
    }
    try {
      if (typeof inputGrant !== "string") {
        console.error("Input grant must be a string");
        return;
      }

      let updatedGrants;
      if (localStorageGrants && Array.isArray(localStorageGrants)) {
        updatedGrants = [...localStorageGrants, inputGrant];
      } else {
        updatedGrants = [inputGrant];
      }

      await localStorage.setItem("grants", JSON.stringify(updatedGrants));
      setLocalStorageGrants(updatedGrants);
    } catch (error) {
      console.error(error);
    }
    const event = new Event("storageUpdate");
    window.dispatchEvent(event);
  };

  const deleteLocalStorageGrant = async (grantToRemove) => {
    try {
      const updatedGrants = localStorageGrants.filter(
        (grant) => grant !== grantToRemove
      );
  
      await localStorage.setItem("grants", JSON.stringify(updatedGrants));
      setLocalStorageGrants(updatedGrants);
  
      const event = new Event("storageUpdate");
      window.dispatchEvent(event);
    } catch (error) {
      console.error(error);
    }
  };

  return [localStorageGrants, setLocalStorage, deleteLocalStorageGrant];
}
