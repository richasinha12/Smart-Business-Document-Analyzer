import React, { createContext, useState, useContext } from "react";

const QueryContext = createContext();

export const QueryContextProvider = ({ children }) => {
  const [queryResponses, setQueryResponses] = useState({
    summary: "",
    entity_extraction: "",
    question_answer: "",
  });

  const updateQueryResponse = (type, response) => {
    setQueryResponses((prevResponses) => ({
      ...prevResponses,
      [type]: response,
    }));
  };

  return (
    <QueryContext.Provider value={{ queryResponses, updateQueryResponse }}>
      {children}
    </QueryContext.Provider>
  );
};

export const useQueryContext = () => useContext(QueryContext);
