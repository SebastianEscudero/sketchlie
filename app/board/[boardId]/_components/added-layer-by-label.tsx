import { memo } from 'react';

interface AddedLayerByLabelProps {
    addedByLabel: string;
}

export const AddedLayerByLabel = memo(({ addedByLabel }: AddedLayerByLabelProps) => {
    if (!addedByLabel) return null;

    return (
        <div className="absolute bottom-8 left-8 text-zinc-500 dark:text-zinc-400 text-sm">
            Added by <span className="font-bold">{addedByLabel}</span>
        </div>
    )
}, (prevProps, nextProps) => prevProps.addedByLabel === nextProps.addedByLabel);

AddedLayerByLabel.displayName = 'AddedLayerByLabel';