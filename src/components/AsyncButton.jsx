import React from 'react';
import { Button, CircularProgress } from '@material-ui/core/es';
import { Check as CheckIcon } from '@material-ui/icons';

const AsyncButton = (
	{ dirty, processed, processing, value, disabled, done, children, ...buttonProps } //
) => {
	return (
		<Button {...buttonProps} disabled={!!disabled}>
			{processing && <CircularProgress size={24} />}
			{processed && processing && dirty && <CheckIcon />}
			{processed && processing && dirty ? done : children}
		</Button>
	);
};

export default AsyncButton;
