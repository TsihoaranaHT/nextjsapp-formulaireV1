"use client";

import { Pencil } from "lucide-react";

interface CriteriaTagsProps {
  criteria: string[];
  onModify?: () => void;
}

const CriteriaTags = ({ criteria, onModify }: CriteriaTagsProps) => {
  return (
    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
      <span className="text-xs sm:text-sm text-muted-foreground">Critères :</span>
      <div className="flex flex-wrap items-center gap-1 sm:gap-2">
        {criteria.map((criterion, index) => (
          <span key={index} className="inline-flex items-center">
            <span className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm font-medium text-secondary-foreground">
              {criterion}
            </span>
            {index < criteria.length - 1 && (
              <span className="ml-1 sm:ml-2 text-muted-foreground hidden sm:inline">•</span>
            )}
          </span>
        ))}
      </div>
      {onModify && (
        <button
          onClick={onModify}
          className="hidden ml-1 sm:ml-2 inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
        >
          <Pencil className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          <span className="hidden sm:inline">Modifier</span>
        </button>
      )}
    </div>
  );
};

export default CriteriaTags;
