import React, { useEffect, useRef } from 'react';
import { ProjectItem } from '../data/portfolioData';
import { X, ExternalLink, Database, Server, CheckCircle2, ShieldCheck, Terminal, Cpu } from 'lucide-react';

interface BlueprintModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const BlueprintModal: React.FC<BlueprintModalProps> = ({ project, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [project]);

  // Fallback for browsers without native <dialog closedby> per modern-web-guidance
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleBackdropClick = (event: MouseEvent) => {
      if (!('closedBy' in HTMLDialogElement.prototype)) {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isDialogContent = (
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width
        );
        if (!isDialogContent) {
          onClose();
        }
      }
    };

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener('click', handleBackdropClick);
    dialog.addEventListener('cancel', handleCancel);

    return () => {
      dialog.removeEventListener('click', handleBackdropClick);
      dialog.removeEventListener('cancel', handleCancel);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <dialog
      ref={dialogRef}
      {...({ closedby: 'any' } as any)}
      aria-labelledby="blueprint-dialog-title"
      className="m-auto max-w-3xl w-[92vw] rounded-2xl p-0 border border-amber-900/20 dark:border-teal-500/30 bg-[#fffdf9] dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-2xl backdrop:bg-stone-950/60 backdrop:backdrop-blur-sm"
    >
      <div className="p-6 md:p-8 relative max-h-[85vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close blueprint modal"
          className="absolute top-5 right-5 p-2 rounded-full text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tag & Title */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            {project.category}
          </span>
          <span className="text-xs font-mono text-stone-500">
            {project.period} • {project.role}
          </span>
        </div>

        <h2 id="blueprint-dialog-title" className="text-2xl md:text-3xl font-serif font-bold text-stone-900 dark:text-stone-50 mb-4">
          {project.title}
        </h2>

        <p className="text-stone-700 dark:text-stone-300 text-base leading-relaxed mb-6 font-sans">
          {project.summary}
        </p>

        {/* Metrics Grid */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-amber-500/5 dark:bg-teal-500/5 border border-amber-600/15 dark:border-teal-500/20 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs font-mono font-semibold text-stone-800 dark:text-stone-200">
                  {metric}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="mb-6">
          <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-stone-500 mb-2 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" /> Applied Architecture & Tools
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-mono rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Key Engineering Highlights */}
        <div className="mb-6">
          <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-stone-500 mb-3 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" /> Engineering Highlights & Architecture
          </h3>
          <ul className="space-y-2.5">
            {project.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-stone-700 dark:text-stone-300 font-sans leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold text-white bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 rounded-lg shadow-sm transition-all"
              >
                Inspect Live System <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold text-stone-800 dark:text-stone-200 bg-stone-200 hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 rounded-lg transition-all"
              >
                Source Repo <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 text-xs font-mono font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
          >
            Dismiss [ESC]
          </button>
        </div>
      </div>
    </dialog>
  );
};
