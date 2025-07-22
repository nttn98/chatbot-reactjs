function Sidebar() {
  return (
    <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
      <h4>Hisamitsu</h4>
      <ul className="nav flex-column mt-4">
        <li className="nav-item">
          <a className="nav-link text-white" href="#">
            Dashboard
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
