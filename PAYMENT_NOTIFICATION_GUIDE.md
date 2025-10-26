# Payment & Notification System - Implementation Guide

## Overview
Complete Payment and Notification system components have been added to the PeerPay frontend application.

## Location
All components are located in:
- **Payment**: `src/components/payment/`
- **Notifications**: `src/components/notifications/`

## Components Created

### Payment System (`src/components/payment/`)
1. **CreatePayment** - Create new payment with Stripe
2. **ConfirmPayment** - Confirm completed payment
3. **PaymentDetails** - View payment details
4. **RefundPayment** - Process refunds
5. **PaymentList** - List all payments

### Notification System (`src/components/notifications/`)
1. **NotificationBadge** - Unread count badge
2. **NotificationItem** - Individual notification
3. **NotificationList** - Paginated list
4. **NotificationCenter** - Dropdown panel
5. **CreateNotification** - Create notifications

## Usage Example

### Import Components
```typescript
// Payment components
import { 
  CreatePayment, 
  PaymentList, 
  PaymentDetails 
} from '@/components/payment/PaymentSystem';

// Notification components
import { 
  NotificationCenter, 
  NotificationList 
} from '@/components/notifications/NotificationSystem';
```

### Use in Your Pages
```typescript
// In employer dashboard
<PaymentList userId={currentUser.id} userType="employer" />

// In navigation bar
<NotificationCenter userId={currentUser.id} />

// In notifications page
<NotificationList userId={currentUser.id} />
```

## API Configuration

The components use environment variables for API base URL:
```env
VITE_API_URL=https://localhost:7255/api
```

Add this to your `.env.development` or `.env` file.

## Styling

Components include their own CSS files:
- `PaymentSystem.css`
- `NotificationSystem.css`

These are automatically imported in the TypeScript components.

## Features

### Payment Features
✅ Create payments with Stripe integration  
✅ View payment history  
✅ Process refunds  
✅ Real-time status updates  
✅ Multi-currency support  

### Notification Features
✅ Real-time unread count  
✅ Auto-refresh every 30 seconds  
✅ 7 notification types with icons  
✅ Mark as read functionality  
✅ Pagination support  
✅ Dropdown notification center  

## Next Steps

1. **Integrate into existing pages**:
   - Add `NotificationCenter` to your navigation bar
   - Add `PaymentList` to employer/student dashboards
   - Create dedicated payment and notification pages

2. **Add Stripe Configuration**:
   - Get Stripe API keys from dashboard
   - Add to backend `appsettings.json`
   - Add publishable key to frontend for Stripe Elements

3. **Customize Styling**:
   - Modify CSS files to match your theme
   - Update colors, fonts, spacing as needed

4. **Add Routing**:
   ```typescript
   // In your router
   <Route path="/payments" element={<PaymentList userId={user.id} userType={user.type} />} />
   <Route path="/notifications" element={<NotificationList userId={user.id} />} />
   ```

## Support

For issues or questions, refer to the backend API documentation in `PROJECT_REPORT.md`.
