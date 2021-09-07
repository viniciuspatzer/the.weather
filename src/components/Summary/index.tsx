import { Content } from "./styles"

export function Summary() {
  return (
    <Content>
      <div className="wrapper">
        <h1>08°</h1>
        <div className="stats">
          <h3>London</h3>
          <span>06:09 - Sunday, 6 Oct '19</span>
        </div>
        <div className="status">
          <i className="fas fa-cloud-showers-heavy"></i>
          <span>Rainy</span>
        </div>
      </div>
    </Content>
  )
}