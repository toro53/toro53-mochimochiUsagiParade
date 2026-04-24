'use client';

import { BandScheduleEvent, getEventTypeLabel, getEventTypeColor, ScheduleEventType } from '@/data/bandSchedule';
import { useEffect, useState } from 'react';

interface ScheduleDetailModalProps {
  event?: BandScheduleEvent;
  mode: 'view' | 'edit' | 'create';
  onClose: () => void;
  onSave?: (event: BandScheduleEvent) => Promise<void>;
  onDelete?: (eventId: string) => Promise<void>;
}

interface FormData {
  title: string;
  date: string;
  time: string;
  type: ScheduleEventType;
  location: string;
  notes: string;
}

export default function ScheduleDetailModal({
  event,
  mode: initialMode,
  onClose,
  onSave,
  onDelete,
}: ScheduleDetailModalProps) {
  const [mode, setMode] = useState<'view' | 'edit' | 'create'>(initialMode);
  const [formData, setFormData] = useState<FormData>(
    event ? {
      title: event.title,
      date: event.date,
      time: event.time || '',
      type: event.type,
      location: event.location || '',
      notes: event.notes || '',
    } : {
      title: '',
      date: new Date().toISOString().split('T')[0],
      time: '',
      type: 'rehearsal',
      location: '',
      notes: '',
    }
  );
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00Z');
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      setError('タイトルは必須です');
      return false;
    }
    if (!formData.date) {
      setError('日付は必須です');
      return false;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.date)) {
      setError('日付形式が正しくありません');
      return false;
    }
    if (formData.time && !/^\d{2}:\d{2}$/.test(formData.time)) {
      setError('時刻形式は HH:mm である必要があります');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    setError('');
    if (!validateForm() || !onSave) return;

    setIsSaving(true);
    try {
      const newEvent: BandScheduleEvent = {
        id: event?.id || `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: formData.title,
        date: formData.date,
        time: formData.time || undefined,
        type: formData.type,
        location: formData.location || undefined,
        notes: formData.notes || undefined,
      };
      await onSave(newEvent);
      onClose();
    } catch (err) {
      setError('保存に失敗しました');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!event || !onDelete) return;
    if (!confirm(`"${event.title}"を削除してもよろしいですか？`)) return;

    try {
      await onDelete(event.id);
      onClose();
    } catch (err) {
      setError('削除に失敗しました');
      console.error(err);
    }
  };

  if (mode === 'view' && event) {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div
          className="vintage-card max-w-[500px] w-full p-8 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-[1.4rem] font-serif text-fg mb-2">
                {event.title}
              </h2>
              <span className={`inline-block text-[0.7rem] uppercase tracking-wider px-2 py-1 rounded-sm ${getEventTypeColor(event.type)}`}>
                {getEventTypeLabel(event.type)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-fg-muted hover:text-fg text-[1.5rem] leading-none"
              aria-label="閉じる"
            >
              ×
            </button>
          </div>

          <div className="space-y-4 text-[0.9rem]">
            <div>
              <p className="text-fg-muted text-[0.8rem] uppercase tracking-wider mb-1">
                日付
              </p>
              <p className="text-fg font-mono">{formatDate(event.date)}</p>
            </div>

            {event.time && (
              <div>
                <p className="text-fg-muted text-[0.8rem] uppercase tracking-wider mb-1">
                  時刻
                </p>
                <p className="text-fg font-mono">{event.time}</p>
              </div>
            )}

            {event.location && (
              <div>
                <p className="text-fg-muted text-[0.8rem] uppercase tracking-wider mb-1">
                  場所
                </p>
                <p className="text-fg">{event.location}</p>
              </div>
            )}

            {event.notes && (
              <div>
                <p className="text-fg-muted text-[0.8rem] uppercase tracking-wider mb-1">
                  備考
                </p>
                <p className="text-fg whitespace-pre-wrap">{event.notes}</p>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-8">
            {onSave && (
              <button
                onClick={() => setMode('edit')}
                className="flex-1 px-4 py-3 border border-border text-fg-muted hover:border-accent hover:text-accent transition-colors uppercase text-[0.75rem] tracking-[0.15em] font-medium"
              >
                編集
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-accent text-accent hover:bg-accent hover:text-card-bg transition-colors uppercase text-[0.75rem] tracking-[0.15em] font-medium"
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="vintage-card max-w-[500px] w-full p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-[1.4rem] font-serif text-fg">
            {mode === 'create' ? '新規スケジュール' : 'スケジュール編集'}
          </h2>
          <button
            onClick={onClose}
            className="text-fg-muted hover:text-fg text-[1.5rem] leading-none"
            aria-label="閉じる"
          >
            ×
          </button>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          {error && (
            <div className="p-3 bg-red-900 text-red-200 rounded-sm text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-fg-muted text-[0.8rem] uppercase tracking-wider mb-2">
              タイトル <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-card-bg border border-border text-fg rounded-sm focus:outline-none focus:border-accent"
              placeholder="イベント名を入力"
            />
          </div>

          <div>
            <label className="block text-fg-muted text-[0.8rem] uppercase tracking-wider mb-2">
              日付 <span className="text-accent">*</span>
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-3 bg-card-bg border border-border text-fg rounded-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-fg-muted text-[0.8rem] uppercase tracking-wider mb-2">
              時刻
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full px-4 py-3 bg-card-bg border border-border text-fg rounded-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-fg-muted text-[0.8rem] uppercase tracking-wider mb-2">
              種類 <span className="text-accent">*</span>
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as ScheduleEventType })}
              className="w-full px-4 py-3 bg-card-bg border border-border text-fg rounded-sm focus:outline-none focus:border-accent"
            >
              <option value="rehearsal">リハーサル</option>
              <option value="performance">ライブ</option>
              <option value="meeting">ミーティング</option>
              <option value="event">イベント</option>
            </select>
          </div>

          <div>
            <label className="block text-fg-muted text-[0.8rem] uppercase tracking-wider mb-2">
              場所
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-3 bg-card-bg border border-border text-fg rounded-sm focus:outline-none focus:border-accent"
              placeholder="開催場所を入力"
            />
          </div>

          <div>
            <label className="block text-fg-muted text-[0.8rem] uppercase tracking-wider mb-2">
              備考
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-3 bg-card-bg border border-border text-fg rounded-sm focus:outline-none focus:border-accent"
              placeholder="補足情報を入力"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            {mode === 'edit' && onDelete && (
              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 px-4 py-3 border border-red-900 text-red-200 hover:bg-red-900 transition-colors uppercase text-[0.75rem] tracking-[0.15em] font-medium rounded-sm"
              >
                削除
              </button>
            )}
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 px-6 py-3 bg-accent text-card-bg hover:opacity-90 disabled:opacity-50 uppercase text-[0.75rem] tracking-[0.15em] font-medium rounded-sm transition-all"
            >
              {isSaving ? '保存中...' : mode === 'create' ? '作成' : '保存'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-border text-fg-muted hover:border-accent hover:text-accent transition-colors uppercase text-[0.75rem] tracking-[0.15em] font-medium rounded-sm"
            >
              キャンセル
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
