import '../css/Sidebar.css';
import React, { useState } from 'react';
import { RiArchive2Fill, RiFileUploadLine } from "react-icons/ri";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from 'react-router-dom';

export default function Sidebars() {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => setCollapsed(!collapsed);
  const handleToggleSidebar = (value) => setToggled(value);

  return (
    <Sidebar
      className={`app ${toggled ? "toggled" : ""}`}
      style={{ height: "100%", position: "absolute" }}
      collapsed={collapsed}
      toggled={toggled}
    >
      <Menu>
        {collapsed ? (
          <MenuItem icon={<FiChevronsRight />} onClick={handleCollapsedChange} />
        ) : (
          <MenuItem suffix={<FiChevronsLeft />} onClick={handleCollapsedChange} />
        )}
      </Menu>

      <Menu>
        <MenuItem icon={<RiFileUploadLine />} component={<Link to="/" />}>
          Upload Image
        </MenuItem>

        <MenuItem icon={<RiArchive2Fill />} component={<Link to="/library" />}>
          Library
        </MenuItem>

      </Menu>
    </Sidebar>
  );
}
