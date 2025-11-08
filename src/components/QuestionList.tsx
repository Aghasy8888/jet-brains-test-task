import type { TriviaQuestion } from '../types';
import { decodeHtmlEntities } from '../helpers/htmlDecoder';

interface QuestionListProps {
  questions: TriviaQuestion[];
}

function QuestionList({ questions }: QuestionListProps) {
  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <div
          key={index}
          className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
        >
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {question.difficulty}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              Question {index + 1}
            </span>
          </div>
          <p className="text-gray-800 dark:text-gray-200 font-medium mb-3">
            {decodeHtmlEntities(question.question)}
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-green-700 dark:text-green-400">
                Correct:
              </span>
              <span className="text-sm text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded">
                {decodeHtmlEntities(question.correct_answer)}
              </span>
            </div>
            {question.incorrect_answers.length > 0 && (
              <div>
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                  Incorrect:
                </span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {question.incorrect_answers.map((answer, ansIndex) => (
                    <span
                      key={ansIndex}
                      className="text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded"
                    >
                      {decodeHtmlEntities(answer)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuestionList;
