import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const ListContext = createContext();

function ListProvider(props) {
  const loc = useLocation();
  const [uname, setUname] = useState(loc.state?.username);

  useEffect(() => {
    setUname(loc.state?.username);
  }, [uname, loc.state?.username]);

  return (
    <ListContext.Provider value={uname}>{props.children}</ListContext.Provider>
  );
}

export default ListProvider;
