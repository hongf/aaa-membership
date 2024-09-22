import { ErrorMessage } from '@hookform/error-message';
import { Autocomplete, Box, TextField, colors } from '@mui/material';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { FormErrorMsg } from '../FormErrorMsg';
import { IFormInputProps } from '../IFormTextInputProps';

import { FormInputLabel } from '../FormInputLabel';
import { IRefDataItem } from '../../../../schema/IRefDataItem';
import { getCrlIdByAccessor } from '../../../../utils/stringHelper';

interface IProps extends IFormInputProps {
  options: IRefDataItem[];
}

export const FromSelector = (props: IProps): JSX.Element => {
  //const { accessor, label, options, helpInfo, iconFolder, ...rest } = props;
  //tidy up required, all options, just use IRefDatasetItem, all our radiobutton, checkbox will use same reference data structure
  const { accessor, label, disabled, options } = props;

  const {
    control,
    register,
    trigger,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const id = getCrlIdByAccessor(accessor);
  const [focused, setFocused] = useState(false);

  const blurHandle = (event: any): void => {
    // trigger validate for the accessor when blur
    accessor && trigger(accessor);
    setFocused(false);
  };

  return (
    <Box
      sx={{
        // my: 1,
        '& .input-focused': {
          outline: 'none',
          borderRadius: 1,
          //Todo all input should have same focus
          //via css better ?
          boxShadow: (theme) => {
            return `0 0 0 3px #33c5b4`;
          },
        },
        '& .Mui-disabled': { background: colors.grey[300] },
        '& .MuiOutlinedInput-root': { mb: 0 },
      }}
    >
      <FormInputLabel {...props} />
      <Controller
        control={control}
        name={accessor}
        render={({ field: { value } }) => (
          <Autocomplete
            size="small"
            onChange={(event, item) => {
              //  onChange(item.code);
              setValue(accessor, item?.code, {
                shouldDirty: true,
                shouldValidate: true,
              });
            }}
            value={value}
            options={options}
            getOptionLabel={(item) => (item.name ? item.name : '')}
            renderInput={(params) => (
              <TextField ref={register(accessor).ref} {...params} />
            )}
            isOptionEqualToValue={(option, value) =>
              !value || option.code === value
            }
          />
        )}
      />

      <Box sx={{ mt: 1.5 }}>
        <ErrorMessage errors={errors} name={accessor} as={FormErrorMsg} />
      </Box>
    </Box>
  );
};
