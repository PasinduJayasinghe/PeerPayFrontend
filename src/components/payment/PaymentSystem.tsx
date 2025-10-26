import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:7255/api';

// Types
interface PaymentDto {
  paymentId: string;
  jobId: string;
  employerId: string;
  studentId: string;
  amount: number;
  currency: string;
  status: string;
  paymentIntentId?: string;
  clientSecret?: string;
  paidAt?: string;
  refundedAt?: string;
  notes?: string;
}

interface CreatePaymentDto {
  jobId: string;
  employerId: string;
  studentId: string;
  amount: number;
  currency: string;
  notes?: string;
}

// Payment Creation Component
export const CreatePayment: React.FC<{ jobId: string; employerId: string; studentId: string }> = ({
  jobId,
  employerId,
  studentId,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<string>('usd');
  const [notes, setNotes] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [payment, setPayment] = useState<PaymentDto | null>(null);

  const handleCreatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const paymentData: CreatePaymentDto = {
        jobId,
        employerId,
        studentId,
        amount,
        currency,
        notes,
      };

      const response = await axios.post(`${API_BASE_URL}/payment/create`, paymentData);
      setPayment(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-payment">
      <h2>Create Payment</h2>
      <form onSubmit={handleCreatePayment}>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label>Currency:</label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="gbp">GBP</option>
          </select>
        </div>

        <div className="form-group">
          <label>Notes:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add payment notes..."
            rows={3}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Payment'}
        </button>
      </form>

      {payment && (
        <div className="payment-created">
          <h3>Payment Created Successfully!</h3>
          <p><strong>Payment ID:</strong> {payment.paymentId}</p>
          <p><strong>Amount:</strong> {payment.amount} {payment.currency.toUpperCase()}</p>
          <p><strong>Status:</strong> {payment.status}</p>
          {payment.clientSecret && (
            <div className="payment-intent">
              <p><strong>Client Secret:</strong> {payment.clientSecret}</p>
              <p className="info">Use this client secret with Stripe Elements to complete payment</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Payment Confirmation Component
export const ConfirmPayment: React.FC<{ paymentId: string; paymentIntentId: string }> = ({
  paymentId,
  paymentIntentId,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const handleConfirmPayment = async () => {
    setLoading(true);
    setError('');

    try {
      await axios.post(`${API_BASE_URL}/payment/confirm`, {
        paymentId,
        paymentIntentId,
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to confirm payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="confirm-payment">
      <h3>Confirm Payment</h3>
      {error && <div className="error-message">{error}</div>}
      {success ? (
        <div className="success-message">
          <p>✓ Payment confirmed successfully!</p>
        </div>
      ) : (
        <button onClick={handleConfirmPayment} disabled={loading}>
          {loading ? 'Confirming...' : 'Confirm Payment'}
        </button>
      )}
    </div>
  );
};

// Payment Details Component
export const PaymentDetails: React.FC<{ paymentId: string }> = ({ paymentId }) => {
  const [payment, setPayment] = useState<PaymentDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/payment/${paymentId}`);
        setPayment(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load payment');
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [paymentId]);

  if (loading) return <div>Loading payment details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!payment) return <div>Payment not found</div>;

  return (
    <div className="payment-details">
      <h2>Payment Details</h2>
      <div className="detail-card">
        <div className="detail-row">
          <span className="label">Payment ID:</span>
          <span className="value">{payment.paymentId}</span>
        </div>
        <div className="detail-row">
          <span className="label">Amount:</span>
          <span className="value">{payment.amount} {payment.currency.toUpperCase()}</span>
        </div>
        <div className="detail-row">
          <span className="label">Status:</span>
          <span className={`value status-${payment.status.toLowerCase()}`}>{payment.status}</span>
        </div>
        <div className="detail-row">
          <span className="label">Job ID:</span>
          <span className="value">{payment.jobId}</span>
        </div>
        {payment.paidAt && (
          <div className="detail-row">
            <span className="label">Paid At:</span>
            <span className="value">{new Date(payment.paidAt).toLocaleString()}</span>
          </div>
        )}
        {payment.refundedAt && (
          <div className="detail-row">
            <span className="label">Refunded At:</span>
            <span className="value">{new Date(payment.refundedAt).toLocaleString()}</span>
          </div>
        )}
        {payment.notes && (
          <div className="detail-row">
            <span className="label">Notes:</span>
            <span className="value">{payment.notes}</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Payment Refund Component
export const RefundPayment: React.FC<{ paymentId: string }> = ({ paymentId }) => {
  const [refundAmount, setRefundAmount] = useState<number>(0);
  const [reason, setReason] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const handleRefund = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post(`${API_BASE_URL}/payment/refund`, {
        paymentId,
        refundAmount,
        reason,
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to process refund');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="refund-payment">
      <h3>Refund Payment</h3>
      {success ? (
        <div className="success-message">
          <p>✓ Refund processed successfully!</p>
        </div>
      ) : (
        <form onSubmit={handleRefund}>
          <div className="form-group">
            <label>Refund Amount:</label>
            <input
              type="number"
              value={refundAmount}
              onChange={(e) => setRefundAmount(parseFloat(e.target.value))}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label>Reason:</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason for refund..."
              rows={3}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Process Refund'}
          </button>
        </form>
      )}
    </div>
  );
};

// Payment List Component
export const PaymentList: React.FC<{ userId: string; userType: 'employer' | 'student' }> = ({
  userId,
  userType,
}) => {
  const [payments, setPayments] = useState<PaymentDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const endpoint = userType === 'employer' ? 'employer' : 'student';
        const response = await axios.get(`${API_BASE_URL}/payment/${endpoint}/${userId}`);
        setPayments(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load payments');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [userId, userType]);

  if (loading) return <div>Loading payments...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="payment-list">
      <h2>My Payments</h2>
      {payments.length === 0 ? (
        <p>No payments found</p>
      ) : (
        <table className="payment-table">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Job ID</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.paymentId}>
                <td>{payment.paymentId.substring(0, 8)}...</td>
                <td>{payment.amount} {payment.currency.toUpperCase()}</td>
                <td>
                  <span className={`status-badge status-${payment.status.toLowerCase()}`}>
                    {payment.status}
                  </span>
                </td>
                <td>{payment.jobId.substring(0, 8)}...</td>
                <td>{payment.paidAt ? new Date(payment.paidAt).toLocaleDateString() : 'N/A'}</td>
                <td>
                  <button className="btn-view">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
