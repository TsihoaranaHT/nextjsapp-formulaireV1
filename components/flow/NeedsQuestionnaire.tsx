'use client';

import { useState, useEffect } from "react";
import ProgressHeader from "./ProgressHeader";
import QuestionScreen from "./QuestionScreen";
import { QUESTIONS } from "@/data/questions";
import { useFlowStore } from "@/lib/stores/flow-store";

interface NeedsQuestionnaireProps {
  onComplete: (answers: Record<number, string[]>) => void;
}

const STEPS = [
  { id: 1, label: "Votre besoin" },
  { id: 2, label: "Sélection" },
  { id: 3, label: "Demande de devis" },
];

const NeedsQuestionnaire = ({ onComplete }: NeedsQuestionnaireProps) => {
  // Store Zustand pour persistance dans sessionStorage
  const {
    userAnswers,
    otherTexts,
    setAnswer,
    setOtherText,
    setStartTime,
    startTime,
  } = useFlowStore();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Initialiser le timestamp de début du funnel
  useEffect(() => {
    if (!startTime) {
      setStartTime(Date.now());
    }
  }, [startTime, setStartTime]);

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUESTIONS.length;

  const handleSelectAnswer = (answerId: string, autoAdvance?: boolean) => {
    const currentAnswers = userAnswers[currentQuestion.id] || [];

    if (currentQuestion.multiSelect) {
      // Toggle selection for multi-select
      if (currentAnswers.includes(answerId)) {
        setAnswer(currentQuestion.id, currentAnswers.filter((id) => id !== answerId));
      } else {
        setAnswer(currentQuestion.id, [...currentAnswers, answerId]);
      }
    } else {
      // Single select - replace and auto-advance
      setAnswer(currentQuestion.id, [answerId]);

      // Auto-advance after a short delay for visual feedback
      if (autoAdvance) {
        setTimeout(() => {
          handleNext();
        }, 300);
      }
    }
  };

  const handleOtherTextChange = (text: string) => {
    setOtherText(currentQuestion.id, text);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // All questions answered, proceed to selection
      onComplete(userAnswers);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Calculate progress: each question is a portion of step 1 (0-33%)
  const questionProgress = ((currentQuestionIndex + 1) / totalQuestions) * 33;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      <ProgressHeader
        steps={STEPS}
        currentStep={1}
        progress={questionProgress}
      />

      <div className="flex-1 overflow-y-auto">
        <QuestionScreen
          question={currentQuestion}
          currentIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          selectedAnswers={userAnswers[currentQuestion.id] || []}
          otherText={otherTexts[currentQuestion.id] || ""}
          onSelectAnswer={handleSelectAnswer}
          onOtherTextChange={handleOtherTextChange}
          onNext={handleNext}
          onBack={handleBack}
          isFirst={currentQuestionIndex === 0}
          isLast={currentQuestionIndex === totalQuestions - 1}
        />
      </div>
    </div>
  );
};

export default NeedsQuestionnaire;
