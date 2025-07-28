import { useState } from "react";

const usePost = (url, postData) => {
  const fetchData = async () => {
    try {
      const response = fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "");
    } catch (error) {
      console.log(error.message);
    }
  };

  return fetchData;
};

export default usePost;
