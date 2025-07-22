import React from "react";
import "./styles.css";

function Sidebar() {
  const navLinks = [
    { name: "Dashboard", href: "#" },
    { name: "Orders", href: "#" },
    { name: "Products", href: "#" },
    { name: "Customers", href: "#" },
    { name: "Reports", href: "#" },
    { name: "Settings", href: "#" },
  ];

  return (
    <div className="sidebar">
      <h4 className="sidebar-title">Hisamitsu</h4>
      <ul className="nav flex-column sidebar-nav">
        {navLinks.map((link, index) => (
          <li className="nav-item" key={index}>
            <a className="sidebar-link" href={link.href}>
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
