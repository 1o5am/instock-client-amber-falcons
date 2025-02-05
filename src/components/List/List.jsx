import { useEffect, useState } from "react";
import ListItem from "../ListItem/ListItem";

function List({ allItems }) {
  const [isMobile, setIsMobile] = useState(true);
  function checkWidth() {
    if (window.innerWidth >= 768) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }

  useEffect(() => {
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);
  return (
    <div>
      <ul className="list">
        {allItems.map((item) => (
          <ListItem item={item} key={item.id} isMobile={isMobile} />
        ))}
      </ul>
    </div>
  );
}

export default List;
