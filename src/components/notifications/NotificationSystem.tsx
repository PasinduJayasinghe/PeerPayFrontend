import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './NotificationSystem.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:7255/api';

// Types
interface NotificationDto {
  notificationId: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  readAt?: string;
  relatedEntityId?: string;
  relatedEntityType?: string;
}

interface CreateNotificationDto {
  userId: string;
  title: string;
  message: string;
  type: string;
  relatedEntityId?: string;
  relatedEntityType?: string;
}

interface NotificationListResponse {
  notifications: NotificationDto[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

// Notification Badge Component
export const NotificationBadge: React.FC<{ userId: string }> = ({ userId }) => {
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/notification/user/${userId}/unread-count`);
        setUnreadCount(response.data.unreadCount || 0);
      } catch (err) {
        console.error('Failed to fetch unread count:', err);
      }
    };

    fetchUnreadCount();
    
    // Poll for updates every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    
    return () => clearInterval(interval);
  }, [userId]);

  return (
    <div className="notification-badge">
      <span className="icon">🔔</span>
      {unreadCount > 0 && (
        <span className="badge-count">{unreadCount > 99 ? '99+' : unreadCount}</span>
      )}
    </div>
  );
};

// Individual Notification Item Component
export const NotificationItem: React.FC<{
  notification: NotificationDto;
  onMarkAsRead: (id: string) => void;
  onClick?: (notification: NotificationDto) => void;
}> = ({ notification, onMarkAsRead, onClick }) => {
  const getNotificationIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'info':
        return 'ℹ️';
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'error':
        return '❌';
      case 'payment':
        return '💳';
      case 'message':
        return '💬';
      case 'job':
        return '💼';
      default:
        return '🔔';
    }
  };

  const handleClick = () => {
    if (!notification.isRead) {
      onMarkAsRead(notification.notificationId);
    }
    if (onClick) {
      onClick(notification);
    }
  };

  return (
    <div
      className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}
      onClick={handleClick}
    >
      <div className="notification-icon">{getNotificationIcon(notification.type)}</div>
      <div className="notification-content">
        <div className="notification-header">
          <h4 className="notification-title">{notification.title}</h4>
          <span className="notification-time">
            {new Date(notification.createdAt).toLocaleString()}
          </span>
        </div>
        <p className="notification-message">{notification.message}</p>
        <div className="notification-meta">
          <span className={`notification-type type-${notification.type.toLowerCase()}`}>
            {notification.type}
          </span>
          {!notification.isRead && <span className="unread-indicator">New</span>}
        </div>
      </div>
    </div>
  );
};

// Notification List Component with Pagination
export const NotificationList: React.FC<{ userId: string; showUnreadOnly?: boolean }> = ({
  userId,
  showUnreadOnly = false,
}) => {
  const [notifications, setNotifications] = useState<NotificationDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    setError('');
    
    try {
      const endpoint = showUnreadOnly
        ? `${API_BASE_URL}/notification/user/${userId}/unread`
        : `${API_BASE_URL}/notification/user/${userId}`;
      
      const response = await axios.get<NotificationListResponse>(endpoint, {
        params: { pageNumber, pageSize },
      });

      setNotifications(response.data.notifications);
      setTotalPages(response.data.totalPages);
      setTotalCount(response.data.totalCount);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  }, [userId, showUnreadOnly, pageNumber, pageSize]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await axios.put(`${API_BASE_URL}/notification/${notificationId}/read`);
      setNotifications((prev) =>
        prev.map((n) =>
          n.notificationId === notificationId ? { ...n, isRead: true, readAt: new Date().toISOString() } : n
        )
      );
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  if (loading && notifications.length === 0) return <div className="loading">Loading notifications...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="notification-list">
      <div className="notification-header">
        <h2>{showUnreadOnly ? 'Unread Notifications' : 'All Notifications'}</h2>
        <span className="notification-count">{totalCount} total</span>
      </div>

      {notifications.length === 0 ? (
        <div className="no-notifications">
          <p>No notifications to display</p>
        </div>
      ) : (
        <>
          <div className="notifications-container">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.notificationId}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setPageNumber((prev) => Math.max(1, prev - 1))}
                disabled={pageNumber === 1}
              >
                Previous
              </button>
              <span className="page-info">
                Page {pageNumber} of {totalPages}
              </span>
              <button
                onClick={() => setPageNumber((prev) => Math.min(totalPages, prev + 1))}
                disabled={pageNumber === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Notification Center Dropdown Component
export const NotificationCenter: React.FC<{ userId: string }> = ({ userId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationDto[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/notification/user/${userId}/unread-count`);
        setUnreadCount(response.data.unreadCount || 0);
      } catch (err) {
        console.error('Failed to fetch unread count:', err);
      }
    };

    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [userId]);

  useEffect(() => {
    if (isOpen) {
      const fetchNotifications = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${API_BASE_URL}/notification/user/${userId}/unread`, {
            params: { pageNumber: 1, pageSize: 5 },
          });
          setNotifications(response.data.notifications);
        } catch (err) {
          console.error('Failed to fetch notifications:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchNotifications();
    }
  }, [isOpen, userId]);

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await axios.put(`${API_BASE_URL}/notification/${notificationId}/read`);
      setNotifications((prev) =>
        prev.map((n) =>
          n.notificationId === notificationId ? { ...n, isRead: true } : n
        )
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  return (
    <div className="notification-center">
      <button className="notification-toggle" onClick={() => setIsOpen(!isOpen)}>
        <NotificationBadge userId={userId} />
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="dropdown-header">
            <h3>Notifications</h3>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          <div className="dropdown-content">
            {loading ? (
              <div className="loading">Loading...</div>
            ) : notifications.length === 0 ? (
              <div className="no-notifications">
                <p>No new notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.notificationId}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                />
              ))
            )}
          </div>

          <div className="dropdown-footer">
            <a href="/notifications" className="view-all-link">
              View All Notifications
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

// Create Notification Component (for admin/system use)
export const CreateNotification: React.FC<{ targetUserId: string }> = ({ targetUserId }) => {
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<string>('info');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const notificationData: CreateNotificationDto = {
        userId: targetUserId,
        title,
        message,
        type,
      };

      await axios.post(`${API_BASE_URL}/notification`, notificationData);
      setSuccess(true);
      setTitle('');
      setMessage('');
      setType('info');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create notification');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-notification">
      <h2>Create Notification</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Notification title..."
            required
          />
        </div>

        <div className="form-group">
          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Notification message..."
            rows={4}
            required
          />
        </div>

        <div className="form-group">
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
            <option value="payment">Payment</option>
            <option value="message">Message</option>
            <option value="job">Job</option>
          </select>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Notification sent successfully!</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Notification'}
        </button>
      </form>
    </div>
  );
};
