import React from 'react';

import { FieldWrapper, FieldWrapperProps } from './field-wrapper';

function formInput(component: React.ComponentType): React.FC<FieldWrapperProps> {
    return (props: FieldWrapperProps) => (
        <FieldWrapper
            {...props}
            component={component}
        />
    );
}

export { formInput };
