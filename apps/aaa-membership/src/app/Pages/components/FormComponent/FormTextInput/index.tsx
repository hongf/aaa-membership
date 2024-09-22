import { ErrorMessage } from '@hookform/error-message';
import { Box, Grid2 as Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { NumericFormat, PatternFormat } from 'react-number-format';

import { StyledTextField } from './StyledTextField';
import { IFormInputProps } from '../IFormTextInputProps';

import { FormErrorMsg } from '../FormErrorMsg';
 
import { FormInputLabel } from '../FormInputLabel';
import { getCrlIdByAccessor, abbreviate_number } from '../../../../utils/stringHelper';
import { ISODateFormat } from '../../../../utils/sysConfig';
 

export { StyledTextField } from './StyledTextField';

interface IProps extends IFormInputProps {
  maxLength?: number;
  pattern?: string;
  decimalScale?: number;
  withoutThousandSeparator?: boolean;
}

export const FormTextInput = (props: IProps) => {
  const {
    type,
    withoutThousandSeparator,
    accessor,
    label,
    //labelVariant,
    maxLength,
    // helpInfo,
    disabled,
    pattern,
    decimalScale,
    rows,

    placeholder,
  } = props;

  const { control, setValue, getValues, formState, getFieldState } =
    useFormContext();

  const id = getCrlIdByAccessor(accessor);

  const valueWatch = useWatch({
    control,
    name: accessor,
  });

  const [reRender, setReRender] = useState(0);
  useEffect(() => {
    if (reRender > 0) {
      const inputElement = document.getElementById(`${id}`) as HTMLInputElement;
      if (inputElement !== null) inputElement.value = '';
    }
  }, [reRender]);

  /* inputValue to hold the local input value
   * only update form value with debounce
   * trim, for onblur no need debounce
   * debounce start
   */
  // const [inputValue, setInputValue] = useState(getValues(accessor));
  // const localChangeHandle = (newValue: string) => {
  //   setInputValue(newValue);
  // };

  // useEffect(() => {
  //   const delayInputTimeoutId = setTimeout(() => {
  //     changeValueInHookForm(inputValue);
  //   }, 300);
  //   return () => clearTimeout(delayInputTimeoutId);
  // }, [inputValue]);
  /*debounce end */

  const changeValueInHookForm = (newValue: string | number) => {
    /**
     * Debouncer kicks off on init
     * Below is to prevent full validation on init
     */
    if (getValues(accessor) === newValue) return;
    /**
     * There is a potential bug where on init the value from
     * the input field is number. Safe guard test below to convert
     * any number to strings beforehand.
     */
    let cleanValue: string = // Converts any number to string
      (typeof newValue === 'number' ? newValue?.toString() : newValue)?.replace(
        / +/g,
        ' ',
      ); // cleanup remove spaces

    if (type === 'date' && cleanValue === '' && valueWatch === '') {
      //force date input clear up value when date is out bound
      setReRender(reRender + 1);
    }
    if (type === 'number') {
      cleanValue = cleanValue?.replace(/,/g, '');
    }
    if (pattern) {
      cleanValue = cleanValue?.replace(/ /g, '');
    }
    setValue(accessor, cleanValue, {
      shouldDirty: true,
      shouldValidate: true,
    });

    // const { isDirty } = getFieldState(accessor, formState)
    // if (isDirty) { markFieldPathDirty(accessor, setValue, getValues('dirtyUIFields')); }
  };

  const changeValueInHookFormWithTrim = (newValue: string) => {
    changeValueInHookForm(newValue.trim());
  };

  const commonInputProps: any = {
    ref: props?.inputProps?.ref, // ref is required by autocomplete
    id: `parent-${id}`,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      changeValueInHookForm(e.target.value),
    onBlur: (e: React.ChangeEvent<HTMLInputElement>) =>
      changeValueInHookFormWithTrim(e.target.value),
    inputProps: {
      maxLength: maxLength || (type === 'telephone' ? 30 : 512),
      id: `${id}`,
      'data-cy': id,
    },
    error: !!formState.errors[accessor],
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

      <Grid size={{ xs: 12 }}>
        <Controller
          control={control}
          name={accessor}
          render={({ field }) => {
            const { disabled, name, onBlur, onChange, value } = field;
            const fieldPropsLessRef = {
              // ref is not supported
              disabled,
              name,
              onBlur,
              onChange,
              value: value || '',
            };
            return (
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box
                  sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}
                >
                  {type === 'number' && (
                    //If it is number show as numeric input
                    <NumericFormat
                      {...fieldPropsLessRef}
                      thousandSeparator={!withoutThousandSeparator}
                      decimalScale={decimalScale || 0}
                      customInput={StyledTextField}
                      {...commonInputProps}
                      rows={1}
                    />
                  )}
                  {/* If it is telephone, allow leading by 0, numeric only, without separator, max 35 */}
                  {type === 'telephone' && (
                    <NumericFormat
                      {...fieldPropsLessRef}
                      decimalScale={decimalScale || 0}
                      customInput={StyledTextField}
                      {...commonInputProps}
                      rows={1}
                      allowLeadingZeros
                    />
                  )}
                  {pattern && (
                    //If it is number show as numeric input
                    <PatternFormat
                      {...fieldPropsLessRef}
                      format={pattern}
                      mask="_"
                      customInput={StyledTextField}
                      {...commonInputProps}
                    />
                  )}
                  {type !== 'number' &&
                    !pattern &&
                    type !== 'date' &&
                    type !== 'telephone' && (
                      <StyledTextField
                        {...commonInputProps}
                        value={valueWatch}
                        type={type || 'text'}
                      />
                    )}
                  {type === 'date' && (
                    <StyledTextField
                      {...commonInputProps}
                      type="date"
                      inputProps={{
                        ...commonInputProps.inputProps,
                        maxLength: 10,
                        max: '9999-12-31',
                      }}
                      value={
                        valueWatch
                          ? dayjs(valueWatch).format(ISODateFormat)
                          : ''
                      }
                    />
                  )}
                </Box>
                {
                  //Only show up when input more than 80%
                  type !== 'number' &&
                    !pattern &&
                    type !== 'date' &&
                    type !== 'telephone' &&
                    maxLength &&
                    valueWatch &&
                    valueWatch.length > +maxLength * 0.8 && (
                      <Typography
                        sx={{ mt: 0.5, pl: 1, fontSize: '0.8em' }}
                      >{`Maximum ${maxLength} characters (${
                        +maxLength - valueWatch.length
                      } remaining)`}</Typography>
                    )
                }
                {
                  //Only show if "split" is existing, for sure it will not leading by ","
                  type === 'number' &&
                    !withoutThousandSeparator &&
                    valueWatch &&
                    (valueWatch.toString().indexOf(',') > 0 ||
                      valueWatch > 1000) && (
                      <Typography
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          px: 0.5,
                          fontSize: '0.8em',
                          fontStyle: 'italic',
                        }}
                      >
                        {abbreviate_number(valueWatch)}
                      </Typography>
                    )
                }
              </Box>
            );
          }}
        />

        <ErrorMessage
          errors={formState.errors}
          name={accessor}
          as={FormErrorMsg}
        ></ErrorMessage>
      </Grid>
    </>
  );
};
