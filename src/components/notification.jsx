import React, { useState } from "react";
import { Bell } from "lucide-react";
import "./notification.scss";

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { message: "Transaction Approved", read: false },
    { message: "New Login from Device", read: false },
    { message: "Multi-sig Wallet Created", read: false },
  ]);

  const toggleDropdown = () => {
    setOpen(!open);
    if (!open) {
      setNotifications(prev =>
        prev.map(n => ({ ...n, read: true }))
      );
    }
  };

  const hasUnread = notifications.some(n => !n.read);

  return (
    <div className="notification-dropdown">
      <div className="bell-wrapper" onClick={toggleDropdown}>
        <Bell className="bell-icon" />
        {hasUnread && <span className="badge" />}
      </div>

      {open && (
        <div className="dropdown-menu">
          {notifications.length > 0 ? (
            notifications.map((note, index) => (
              <div
                key={index}
                className={`dropdown-item ${note.read ? 'read' : 'unread'}`}
              >
                {note.message}
              </div>
            ))
          ) : (
            <div className="dropdown-item">No Notifications</div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
