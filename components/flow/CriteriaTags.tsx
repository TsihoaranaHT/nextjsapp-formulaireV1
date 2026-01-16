"use client";

import { Pencil } from "lucide-react";

interface CriteriaTagsProps {
  criteria: string[];
  onModify?: () => void;
}

const CriteriaTags = ({ criteria, onModify }: CriteriaTagsProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground">Critères :</span>
      <div className="flex flex-wrap items-center gap-2">
        {criteria.map((criterion, index) => (
          <span key={index}>
            <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
              {criterion}
            </span>
            {index < criteria.length - 1 && (
              <span className="ml-2 text-muted-foreground">•</span>
            )}
          </span>
        ))}
      </div>
      {onModify && (
        <button
          onClick={onModify}
          className="ml-2 inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          <Pencil className="h-3.5 w-3.5" />
          Modifier
        </button>
      )}
    </div>
  );
};

export default CriteriaTags;
