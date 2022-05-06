import { CloseButton } from "../CloseButton";
import { useState } from "react";

import bugImageUrl from '../../assets/bug.svg';
import ideImageUrl from '../../assets/idea.svg';
import thoughtImageUrl from '../../assets/thought.svg';
import { FeedbackTypeSteps } from "./Steps/FeedbackTypeStep";
import { FeedbackContentSteps } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessSteps } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
    BUG: {
        'title': 'Problema',
        'image': {
            'src': bugImageUrl,
            'alt': 'Imagem de um inseto'
        }
    },
    IDEA: {
        'title': 'Ideia',
        'image': {
            'src': ideImageUrl,
            'alt': 'Imagem de uma lâmpada'
        }
    },
    OTHER: {
        'title': 'Outro',
        'image': {
            'src': thoughtImageUrl,
            'alt': 'Imagem de um bão de pensamento'
        }
    },
}

export type FeedbackTypes = keyof typeof feedbackTypes;

export function WidgetForm(){

    const [feedbackType, setFeedbackType] = useState<FeedbackTypes | null>(null)
    const [feedbackSent, setFeedbackSent] = useState(false);

    function handleRestartFeedback(){
        setFeedbackSent(false);
        setFeedbackType(null);
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            { feedbackSent ? (
              <FeedbackSuccessSteps
                onFeedbackRestartRequested={handleRestartFeedback}
              />
            ) : (
                <>
                    {!feedbackType ?(
                        <FeedbackTypeSteps onFeedbackTypeChanged={setFeedbackType}/>
                    ):(
                        <FeedbackContentSteps
                        feedbackType={feedbackType}
                        onFeedbackRestartRequested={handleRestartFeedback}
                        onFeedbackSent={() => setFeedbackSent(true)}
                        />
                    )}
                </>
            )}

            <footer className="text-xs text-neutral-400">
                Feito com ♥ por <a className="underline underline-offset-2" href="#">Mateus Santos</a>
            </footer>
        </div>
    );
}