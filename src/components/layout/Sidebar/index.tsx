import React, { useState, useContext } from "react";
import { useLocation, useRoute } from "wouter";
import { ThemeContext } from "styled-components";
import { SidebarContainer, NavList, NavItem, NavItemText } from "./styles";
import { FaHome, FaBars, FaPlus, FaUser, FaMoon, FaSun, FaSignOutAlt } from "react-icons/fa";

const Sidebar: React.FC = () => {
  const [, setLocation] = useLocation();
  const [currentPageIsHome] = useRoute("/home");
  const [currentPageIsProfile] = useRoute("/profile");
  const { toggleTheme, title: themeTitle } = useContext(ThemeContext);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <SidebarContainer isExpanded={isExpanded}>
      <nav>
        <NavList>
          <NavItem onClick={() => setIsExpanded(!isExpanded)}>
            <FaBars />
            <NavItemText isExpanded={isExpanded}>Menu</NavItemText>
          </NavItem>

          <NavItem isSelected={currentPageIsHome} onClick={() => setLocation("/home")}>
            <FaHome />
            <NavItemText isExpanded={isExpanded}>Home</NavItemText>
          </NavItem>

          <NavItem isSelected={currentPageIsProfile} onClick={() => setLocation("/profile")}>
            <FaUser />
            <NavItemText isExpanded={isExpanded}>Profile</NavItemText>
          </NavItem>

          {currentPageIsHome && (
            <NavItem>
              <FaPlus />
              <NavItemText isExpanded={isExpanded}>Create template</NavItemText>
            </NavItem>
          )}

          <div style={{ marginTop: "auto" }}>
            <NavItem onClick={toggleTheme}>
              {themeTitle === "light" ? <FaMoon /> : <FaSun />}
              <NavItemText isExpanded={isExpanded}>Toggle theme</NavItemText>
            </NavItem>

            <NavItem onClick={() => setLocation("/login")}>
              <FaSignOutAlt />
              <NavItemText isExpanded={isExpanded}>Logout</NavItemText>
            </NavItem>
          </div>
        </NavList>
      </nav>
    </SidebarContainer>
  );
};

export default Sidebar;
