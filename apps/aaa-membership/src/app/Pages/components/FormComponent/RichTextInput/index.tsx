import { ErrorMessage } from '@hookform/error-message';
import { Box, Grid2 as Grid, Typography } from '@mui/material';
//Too heave
// todo update to quill when we get  chance
// import JoditEditor from 'jodit-react';
import JoditEditor from 'jodit-react';
import { useEffect, useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { FormErrorMsg } from '../FormErrorMsg';
import { IFormInputProps } from '../IFormTextInputProps';
import { getCrlIdByAccessor } from '../../../../utils/stringHelper';
import { FormInputLabel } from '../FormInputLabel';

const buttons = [
  'paragraph',
  'bold',
  'strikethrough',
  'underline',
  'italic',
  '|',
  'superscript',
  'subscript',
  '|',
  'align',
  '|',
  'ul',
  'ol',
  'outdent',
  'indent',
  '|',
  'font',
  'fontsize',
  'brush',

  '|',
  'link',
  'table',
  '|',
  'hr',
  'selectall',

  'source',
];

const richTextConfig = {
  readonly: false,

  useSearch: false,
  tabIndex: 0,
  cleanHTML: {
    fillEmptyParagraph: false,
  },
  askBeforePasteHTML: false,
  askBeforePasteFromWord: false,
  defaultActionOnPast: 'insert_clear_html',
  buttons: buttons,
};

interface IProps extends IFormInputProps {
  maxLength?: number;
}

export const RichTextInput = (props: IProps) => {
  const {
    accessor,
    label,
    //labelVariant,
    maxLength,
    // helpInfo,
    disabled, //if disabled, need rend as react node
    rows = 5,

    placeholder,
  } = props;

  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const id = getCrlIdByAccessor(accessor);

  const valueWatch = useWatch({
    control,
    name: accessor,
  });

  const [reRender, setReRender] = useState(0);

  useEffect(() => {
    if (reRender > 0) {
      const inputElement = document.getElementById(`${id}`) as HTMLInputElement;
      inputElement.value = '';
    }
  }, [reRender]);

  const changeHandle = (newValue: string) => {
    setValue(accessor, newValue, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const commonInputProps: any = {
    id: `parent-${id}`,
    onBlur: (value: string) => {
      changeHandle(value);
    },
    inputProps: {
      maxLength: maxLength || 512,
      id: `${id}`,
      'data-cy': id,
    },
    error: !!errors[accessor],
    hiddenLabel: true,
    variant: 'outlined',
    size: 'small',
    sx: { flex: 1 },
    disabled,
    multiline: rows ? true : false,
    rows,
    placeholder,
  };

  return (
    <>
      <FormInputLabel {...props} />

      <Grid
        size={{ xs: 12 }}
        sx={{ '.jodit-react-container': { width: '100%' } }}
      >
        <Controller
          control={control}
          name={accessor}
          render={({ field }) => (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box
                sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}
              >
                <JoditEditor
                  {...commonInputProps}
                  config={{
                    ...richTextConfig,
                    height: (rows as number) * 40,
                  }}
                  value={valueWatch}
                />
              </Box>
              {valueWatch && valueWatch.length > +(maxLength || 512) * 0.8 && (
                <Typography
                  sx={{ mt: 0.5, pl: 1, fontSize: '0.8em' }}
                >{`Maximum ${maxLength} characters (${
                  +(maxLength || 512) - valueWatch.length
                } remaining)`}</Typography>
              )}
            </Box>
          )}
        />

        <ErrorMessage
          errors={errors}
          name={accessor}
          as={FormErrorMsg}
        ></ErrorMessage>
      </Grid>
    </>
  );
};
