import { FiSearch } from 'react-icons/fi'

import { Content } from "./styles";

export function Overview() {
  
  return (
    <Content>
      <form className="search-bar">
        <input type="text" placeholder="Another location"/>
        <div className="icon-box">
          <FiSearch color="#101A26" size="30px"/>
        </div>
      </form>
    </Content>
  );
}
