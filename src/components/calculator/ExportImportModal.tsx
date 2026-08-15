import React, { useState, useRef } from 'react';
import { useGrade } from '../../context/GradeContext';
import { exportStateAsJSON, exportStateAsCSV, importStateFromJSON } from '../../utils/exportImport';
import { X, Upload, FileSpreadsheet, FileJson, CheckCircle2, AlertCircle } from 'lucide-react';

interface ExportImportModalProps {
  onClose: () => void;
}

export const ExportImportModal: React.FC<ExportImportModalProps> = ({ onClose }) => {
  const { state, activeScale, importBackupState } = useGrade();
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownloadJSON = () => {
    exportStateAsJSON(state);
    setFeedback({ type: 'success', message: 'JSON backup downloaded successfully.' });
  };

  const handleDownloadCSV = () => {
    exportStateAsCSV(state, activeScale);
    setFeedback({ type: 'success', message: 'CSV marksheet exported successfully.' });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importStateFromJSON(content);
      if (res.success && res.state) {
        importBackupState(res.state);
        setFeedback({ type: 'success', message: 'Backup restored successfully!' });
      } else {
        setFeedback({ type: 'error', message: res.error || 'Failed to import backup file.' });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="w-full max-w-lg bg-paper border border-gpline shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-labelledby="export-import-title"
      >
        <div className="flex items-center justify-between pb-4 border-b border-gpline mb-5">
          <h2 id="export-import-title" className="text-xl font-serif font-bold text-ink m-0">
            Backup & Export Grades
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 text-gpmuted hover:text-ink transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {feedback && (
          <div
            className={`p-3.5 mb-5 border text-xs flex items-center gap-2 ${
              feedback.type === 'success'
                ? 'bg-green-50 dark:bg-green-950/40 border-green-300 text-green-800 dark:text-green-200'
                : 'bg-red-50 dark:bg-red-950/40 border-gpred/40 text-gpred'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-gpred shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}

        <div className="space-y-4">
          {/* Export Options */}
          <div className="p-4 border border-gpline bg-bg/50 space-y-3">
            <h3 className="text-sm font-mono uppercase font-semibold text-ink m-0">
              Export / Download Data
            </h3>
            <p className="text-xs text-gpmuted m-0">
              Save your semester history to transfer to another device or inspect in Excel / Sheets.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleDownloadJSON}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-gpline bg-paper hover:bg-gpwash text-ink text-xs font-bold transition-colors cursor-pointer"
              >
                <FileJson className="w-4 h-4 text-gpblue" /> Download JSON Backup
              </button>

              <button
                type="button"
                onClick={handleDownloadCSV}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-gpline bg-paper hover:bg-gpwash text-ink text-xs font-bold transition-colors cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-green-600" /> Export CSV Spreadsheet
              </button>
            </div>
          </div>

          {/* Import Backup */}
          <div className="p-4 border border-gpline bg-bg/50 space-y-3">
            <h3 className="text-sm font-mono uppercase font-semibold text-ink m-0">
              Restore from Backup
            </h3>
            <p className="text-xs text-gpmuted m-0">
              Restore your semesters and custom scales from a previous GradeForge JSON backup.
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-gpblue bg-gpblue text-white text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer"
            >
              <Upload className="w-4 h-4" /> Upload JSON Backup File
            </button>
          </div>
        </div>

        <div className="flex justify-end mt-6 pt-4 border-t border-gpline">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold border border-gpline bg-paper hover:bg-bg text-ink cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
