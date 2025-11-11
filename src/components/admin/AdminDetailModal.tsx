import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import adminService from '../../services/adminService';

type EntityType = 'employer' | 'student' | 'job' | 'application';

interface AdminDetailModalProps {
  open: boolean;
  type: EntityType | null;
  item: any | null;
  onClose: () => void;
}

const AdminDetailModal: React.FC<AdminDetailModalProps> = ({ open, type, item, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detail, setDetail] = useState<any | null>(null);

  useEffect(() => {
    if (!open) return;
    setError(null);
    setDetail(null);

    const fetchDetail = async () => {
      try {
        setLoading(true);
        if (type === 'job' && item?.jobId) {
          const data = await adminService.getJobById(Number(item.jobId || item.id));
          setDetail(data);
        } else if ((type === 'employer' || type === 'student') && item) {
          // Try fetch user details if userId exists, otherwise use passed item
          const uid = item.userId ?? item.studentId ?? item.employerId ?? item.id;
          if (uid) {
            // adminService.getUserById expects number in service; attempt parse
            try {
              const parsed = Number(uid);
              if (!isNaN(parsed)) {
                const user = await adminService.getUserById(parsed);
                setDetail({ ...item, user });
              } else {
                setDetail(item);
              }
            } catch (e) {
              // fallback to using item
              setDetail(item);
            }
          } else {
            setDetail(item);
          }
        } else if (type === 'application' && item) {
          // Use provided application details if present
          setDetail(item);
        } else {
          setDetail(item);
        }
      } catch (err: any) {
        setError(err?.message || 'Failed to load details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [open, type, item]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg w-11/12 max-w-3xl p-6 relative shadow-lg">
        <button className="absolute top-4 right-4 text-gray-600" onClick={onClose} aria-label="close">
          <X />
        </button>

        <h2 className="text-xl font-semibold mb-4">{type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Details'}</h2>

        {loading && <div className="text-gray-600">Loading details...</div>}
        {error && <div className="text-red-600">{error}</div>}

        {!loading && !error && detail && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(detail).map(([k, v]) => (
              <div key={k} className="p-3 border rounded">
                <div className="text-xs text-gray-500">{k}</div>
                <div className="text-sm text-gray-800">{typeof v === 'object' ? JSON.stringify(v) : String(v)}</div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && !detail && (
          <div className="text-gray-600">No details available</div>
        )}
      </div>
    </div>
  );
};

export default AdminDetailModal;
